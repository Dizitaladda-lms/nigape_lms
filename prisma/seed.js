const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, "blogs-data.json");
  if (!fs.existsSync(jsonPath)) {
    console.error("No prisma/blogs-data.json found to transfer.");
    return;
  }

  const raw = fs.readFileSync(jsonPath, "utf-8");
  const blogs = JSON.parse(raw);
  console.log(`Starting transfer of ${blogs.length} blogs into database...`);

  let transferred = 0;
  for (const b of blogs) {
    const slug = b.slug;
    await prisma.blog.upsert({
      where: { slug },
      update: {
        title: b.title,
        content: b.content,
        excerpt: b.excerpt,
        coverImg: b.coverImg,
        tags: b.tags || [],
        author: b.author || "Editorial Team",
        metaTitle: b.metaTitle,
        metaDescription: b.metaDescription,
        schemaJsonLd: b.schemaJsonLd,
        published: b.published !== false,
      },
      create: {
        id: b.id,
        title: b.title,
        slug: b.slug,
        content: b.content,
        excerpt: b.excerpt,
        coverImg: b.coverImg,
        tags: b.tags || [],
        author: b.author || "Editorial Team",
        metaTitle: b.metaTitle,
        metaDescription: b.metaDescription,
        schemaJsonLd: b.schemaJsonLd,
        published: b.published !== false,
        createdAt: b.createdAt ? new Date(b.createdAt) : new Date(),
        updatedAt: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      },
    });
    transferred++;
  }

  console.log(`✅ Successfully transferred all ${transferred} blogs into the database!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Transfer failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
