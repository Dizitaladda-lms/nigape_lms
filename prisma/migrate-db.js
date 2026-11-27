require("dotenv/config");
const { PrismaClient } = require("@prisma/client");

/**
 * Migrates all Blog and SeoMetadata records from OLD_DATABASE_URL to NEW_DATABASE_URL (or DATABASE_URL).
 */
async function main() {
  const oldUrl = process.env.OLD_DATABASE_URL?.trim();
  const newUrl = (process.env.NEW_DATABASE_URL || process.env.DATABASE_URL)?.trim();

  if (!oldUrl) {
    throw new Error("Missing OLD_DATABASE_URL in environment variables.");
  }
  if (!newUrl) {
    throw new Error("Missing NEW_DATABASE_URL (or DATABASE_URL) in environment variables.");
  }
  if (oldUrl === newUrl) {
    throw new Error("OLD_DATABASE_URL and NEW_DATABASE_URL must point to different databases.");
  }

  const source = new PrismaClient({ datasourceUrl: oldUrl });
  const target = new PrismaClient({ datasourceUrl: newUrl });

  try {
    console.log("Fetching blogs from source database...");
    const blogs = await source.blog.findMany({ orderBy: { createdAt: "asc" } });
    console.log(`Found ${blogs.length} blog(s). Migrating to target database...`);

    let migratedBlogs = 0;
    for (const b of blogs) {
      const sharedFields = {
        title: b.title,
        content: b.content,
        excerpt: b.excerpt,
        coverImg: b.coverImg,
        tags: b.tags || [],
        author: b.author,
        authorImage: b.authorImage,
        authorDescription: b.authorDescription,
        metaTitle: b.metaTitle,
        metaDescription: b.metaDescription,
        schemaJsonLd: b.schemaJsonLd,
        published: b.published,
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
      };

      await target.blog.upsert({
        where: { slug: b.slug },
        update: sharedFields,
        create: {
          id: b.id,
          slug: b.slug,
          ...sharedFields,
        },
      });
      migratedBlogs += 1;
    }
    console.log(`Migrated ${migratedBlogs} blog(s).`);

    let seoRecords = [];
    try {
      seoRecords = await source.seoMetadata.findMany();
    } catch (error) {
      console.warn("Skipping SeoMetadata (not found or unavailable on source):", error.message);
    }

    if (seoRecords.length > 0) {
      console.log(`Found ${seoRecords.length} SEO metadata record(s). Migrating...`);
      let migratedSeo = 0;
      for (const s of seoRecords) {
        const sharedSeo = {
          entityType: s.entityType,
          entityName: s.entityName,
          metaTitle: s.metaTitle,
          metaDescription: s.metaDescription,
          keywords: s.keywords,
          canonicalUrl: s.canonicalUrl,
          ogTitle: s.ogTitle,
          ogDescription: s.ogDescription,
          ogImage: s.ogImage,
          noIndex: s.noIndex,
          updatedAt: s.updatedAt,
        };

        await target.seoMetadata.upsert({
          where: { path: s.path },
          update: sharedSeo,
          create: {
            id: s.id,
            path: s.path,
            createdAt: s.createdAt,
            ...sharedSeo,
          },
        });
        migratedSeo += 1;
      }
      console.log(`Migrated ${migratedSeo} SEO metadata record(s).`);
    }

    console.log("Database migration completed successfully.");
  } finally {
    await source.$disconnect();
    await target.$disconnect();
  }
}

main().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
