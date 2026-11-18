import { generateUniqueSlug } from "@/lib/slugify";

const text = (value) => (typeof value === "string" ? value.trim() : "");

export function normalizeBlogInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { error: "A blog post payload is required." };
  }

  const title = text(input.title);
  const content = typeof input.content === "string" ? input.content : "";
  if (!title || !content.trim()) {
    return { error: "Title and content are required." };
  }

  const tags = Array.isArray(input.tags)
    ? input.tags.filter((tag) => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean)
    : text(input.tags).split(",").map((tag) => tag.trim()).filter(Boolean);

  return {
    slugInput: text(input.slug) || title,
    data: {
      title,
      content,
      tags: [...new Set(tags)],
      coverImg: text(input.coverImg),
      excerpt: text(input.excerpt),
      author: text(input.author),
      authorImage: text(input.authorImage),
      authorDescription: text(input.authorDescription),
      metaTitle: text(input.metaTitle),
      metaDescription: text(input.metaDescription),
      schemaJsonLd: text(input.schemaJsonLd),
      published: input.published !== false,
    },
  };
}

export async function makeUniqueBlogSlug(slugInput, excludeId) {
  return generateUniqueSlug(slugInput, excludeId);
}
