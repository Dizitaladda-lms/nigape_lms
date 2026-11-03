import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";
import { courses } from "@/Data/data";
import { getSiteUrl } from "@/lib/site-url";

const SEO_STORE_PATH = path.join(process.cwd(), "src", "Data", "seo-metadata.json");

/**
 * Standard known static pages and their baseline SEO configurations.
 */
export const STATIC_PAGES = [
  {
    path: "/",
    entityType: "page",
    entityName: "Home Page",
    defaultMetaTitle: "Generative AI & Prompt Engineering Course in Delhi | NIGAPE",
    defaultMetaDescription:
      "Join NIGAPE for Generative AI & Prompt Engineering in Delhi. Learn AI tools, LLMs, prompting, agents and real projects with mentor support.",
    defaultKeywords:
      "generative AI course in Delhi, prompt engineering course in Delhi, generative AI and prompt engineering course, generative AI certification course, prompt engineering certification, best generative AI course in Delhi, generative AI training in Delhi, AI prompt engineering course, generative AI course with placement, generative AI institute in Delhi",
    defaultCanonicalUrl: "https://www.nigape.com/",
  },
  {
    path: "/about-us",
    entityType: "page",
    entityName: "About Us",
    defaultMetaTitle: "Generative AI & Prompt Engineering Institute Delhi | NIGAPE",
    defaultMetaDescription:
      "Discover NIGAPE, a Delhi institute for Generative AI and Prompt Engineering with practical projects, expert mentorship, career support, and AI programs.",
    defaultKeywords:
      "generative AI institute in Delhi, prompt engineering institute in Delhi, AI and prompt engineering institute, generative AI training institute, generative AI education institute, AI training institute in Delhi, prompt engineering training institute, generative AI learning institute, best AI institute in Delhi, GenAI training institute Delhi",
    defaultCanonicalUrl: "https://www.nigape.com/about-us",
  },
  {
    path: "/courses",
    entityType: "page",
    entityName: "Courses Catalog",
    defaultMetaTitle: "GenAI & Prompt Engineering Courses in Delhi | NIGAPE",
    defaultMetaDescription:
      "Compare NIGAPE Generative AI and Prompt Engineering courses in Delhi, from AI literacy to advanced programs, with projects, mentorship, certification, and career support.",
    defaultKeywords:
      "generative AI course, prompt engineering course, generative AI course in Delhi, prompt engineering course in Delhi, generative AI and prompt engineering course, generative AI certification, AI prompt engineering certification, generative AI training program, prompt engineering course online, generative AI course with placement",
    defaultCanonicalUrl: "https://www.nigape.com/courses",
  },
  {
    path: "/contact-us",
    entityType: "page",
    entityName: "Contact Us",
    defaultMetaTitle: "Generative AI & Prompt Engineering Course Contact | NIGAPE",
    defaultMetaDescription:
      "Contact NIGAPE for Generative AI and Prompt Engineering courses in Delhi. Get fees, batches, syllabus, admission, registration, and career guidance from our team.",
    defaultKeywords:
      "generative AI course enquiry, prompt engineering course enquiry, generative AI course contact number, generative AI institute contact, prompt engineering course admission, generative AI course registration, AI course enquiry Delhi, generative AI training contact, prompt engineering admission Delhi, generative AI course fees Delhi",
    defaultCanonicalUrl: "https://www.nigape.com/contact-us",
  },
  {
    path: "/blog",
    entityType: "page",
    entityName: "Blog",
    defaultMetaTitle: "Generative AI & Prompt Engineering Blog | NIGAPE",
    defaultMetaDescription:
      "Explore Generative AI and Prompt Engineering guides, trends, tools, tutorials, and career insights from NIGAPE, built for practical AI learning.",
    defaultKeywords:
      "generative AI trends 2026, prompt engineering techniques, how to write prompts for AI, generative AI use cases, prompt engineering tools, LLM prompting best practices, AI prompt templates, prompt engineering examples, generative AI applications, career in prompt engineering",
    defaultCanonicalUrl: "https://www.nigape.com/blog",
  },
  {
    path: "/programs/degree-in-ai",
    entityType: "page",
    entityName: "Degree in AI Program",
    defaultMetaTitle: "Degree in Artificial Intelligence & GenAI | NIGAPE",
    defaultMetaDescription:
      "Join the flagship Degree in Artificial Intelligence & Generative AI at NIGAPE. Industry-designed curriculum, hackathons, company tours, and placement readiness.",
    defaultKeywords:
      "degree in AI, bachelor degree in artificial intelligence, AI degree Delhi, GenAI degree course, artificial intelligence program Delhi, AI colleges Delhi NCR",
    defaultCanonicalUrl: "https://www.nigape.com/programs/degree-in-ai",
  },
  {
    path: "/programs/pg-in-ai",
    entityType: "page",
    entityName: "PG in AI Program",
    defaultMetaTitle: "Postgraduate (PG) Program in AI & Generative AI | NIGAPE",
    defaultMetaDescription:
      "Executive Postgraduate program in AI & GenAI for graduates and working professionals. Master advanced LLMs, RAG, autonomous agents, and production AI.",
    defaultKeywords:
      "PG in AI, postgraduate artificial intelligence, PG diploma AI Delhi, executive AI program, GenAI PG course, artificial intelligence masters Delhi",
    defaultCanonicalUrl: "https://www.nigape.com/programs/pg-in-ai",
  },
  {
    path: "/privacy-policy",
    entityType: "page",
    entityName: "Privacy Policy",
    defaultMetaTitle: "Privacy Policy | NIGAPE",
    defaultMetaDescription:
      "Read the Privacy Policy of NIGAPE. Learn how we collect, protect, and handle your personal information responsibly.",
    defaultKeywords: "privacy policy, NIGAPE privacy, data protection, student privacy",
    defaultCanonicalUrl: "https://www.nigape.com/privacy-policy",
  },
  {
    path: "/terms-of-service",
    entityType: "page",
    entityName: "Terms of Service",
    defaultMetaTitle: "Terms of Service | NIGAPE",
    defaultMetaDescription:
      "Review the Terms of Service governing the use of the NIGAPE platform, course enrollment, and educational services.",
    defaultKeywords: "terms of service, NIGAPE terms, student agreement, usage policy",
    defaultCanonicalUrl: "https://www.nigape.com/terms-of-service",
  },
  {
    path: "/terms-and-conditions",
    entityType: "page",
    entityName: "Terms & Conditions",
    defaultMetaTitle: "Terms and Conditions | NIGAPE",
    defaultMetaDescription:
      "Terms and Conditions regarding admissions, fees, code of conduct, and refund guidelines at NIGAPE.",
    defaultKeywords: "terms and conditions, admission terms, course policies, refund policy",
    defaultCanonicalUrl: "https://www.nigape.com/terms-and-conditions",
  },
  {
    path: "/disclaimer",
    entityType: "page",
    entityName: "Disclaimer",
    defaultMetaTitle: "Disclaimer | NIGAPE",
    defaultMetaDescription:
      "Important educational and legal disclaimers regarding NIGAPE certifications, placement assistance, and curriculum outcomes.",
    defaultKeywords: "disclaimer, legal notice, certification disclaimer, educational outcomes",
    defaultCanonicalUrl: "https://www.nigape.com/disclaimer",
  },
  {
    path: "/sitemap",
    entityType: "page",
    entityName: "HTML Sitemap",
    defaultMetaTitle: "HTML Sitemap | NIGAPE",
    defaultMetaDescription:
      "Browse the complete index of courses, programs, guides, articles, and resource pages on the NIGAPE platform.",
    defaultKeywords: "sitemap, course directory, NIGAPE pages, site index",
    defaultCanonicalUrl: "https://www.nigape.com/sitemap",
  },
];

/**
 * Builds the default SEO list for all courses from data.js.
 */
export function getCoursesSeoDefaults() {
  const siteUrl = getSiteUrl();

  return (courses || []).map((course) => {
    const slug = course.slug;
    const coursePath = `/courses/${slug}`;

    // Specific well-crafted defaults for known courses
    if (slug === "diploma-in-generative-ai-prompt-engineering") {
      return {
        path: coursePath,
        entityType: "course",
        entityName: course.title,
        defaultMetaTitle: "Diploma in Generative AI & Prompt Engineering | NIGAPE",
        defaultMetaDescription:
          "Earn a Diploma in Generative AI and Prompt Engineering at NIGAPE. Learn Python, LLMs, prompting, RAG, multimodal AI, and build portfolio projects with placement support.",
        defaultKeywords:
          "diploma in generative AI and prompt engineering, generative AI diploma course, generative AI diploma in Delhi, prompt engineering diploma, generative AI course after 12th, generative AI diploma with placement, advanced prompt engineering course, generative AI certification Delhi, LLM course with prompt engineering, multimodal AI course Delhi",
        defaultCanonicalUrl: `${siteUrl}${coursePath}`,
      };
    }

    if (slug === "advanced-generative-ai-prompt-engineering") {
      return {
        path: coursePath,
        entityType: "course",
        entityName: course.title,
        defaultMetaTitle: "Advanced Generative AI & Prompt Engineering | NIGAPE",
        defaultMetaDescription:
          "Master Advanced Generative AI and Prompt Engineering with agents, RAG, automation, LLMs, and real projects at NIGAPE for career-ready AI skills.",
        defaultKeywords:
          "advanced generative AI course, advanced prompt engineering course, advanced generative AI course in Delhi, advanced generative AI and prompt engineering course, generative AI advanced certification, advanced prompt engineering certification, generative AI course with projects, GenAI agent course, RAG and prompt engineering course, AI automation course with prompt engineering",
        defaultCanonicalUrl: `${siteUrl}${coursePath}`,
      };
    }

    // Default dynamic formula for any course
    const cleanDesc = (course.description || course.fullDescription || `Enroll in ${course.title} at NIGAPE.`).slice(0, 160);
    const keywordsList = [
      course.title.toLowerCase(),
      `${course.title.toLowerCase()} course`,
      `${course.title.toLowerCase()} in delhi`,
      "generative AI course",
      "prompt engineering course",
      "NIGAPE courses",
      ...(course.topics || []).map((t) => t.toLowerCase()),
    ].slice(0, 10).join(", ");

    return {
      path: coursePath,
      entityType: "course",
      entityName: course.title,
      defaultMetaTitle: `${course.title} | NIGAPE`,
      defaultMetaDescription: cleanDesc,
      defaultKeywords: keywordsList,
      defaultCanonicalUrl: `${siteUrl}${coursePath}`,
    };
  });
}

/**
 * Returns baseline fallback SEO for any path.
 */
export function getBaselineSeo(targetPath) {
  const normalized = normalizePath(targetPath);
  const siteUrl = getSiteUrl();

  const foundPage = STATIC_PAGES.find((p) => p.path === normalized);
  if (foundPage) return foundPage;

  const coursesList = getCoursesSeoDefaults();
  const foundCourse = coursesList.find((c) => c.path === normalized);
  if (foundCourse) return foundCourse;

  // General fallback
  const fallbackTitle = normalized
    .replace(/^\//, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    path: normalized,
    entityType: normalized.startsWith("/courses/") ? "course" : "page",
    entityName: fallbackTitle || "Page",
    defaultMetaTitle: `${fallbackTitle || "Page"} | NIGAPE`,
    defaultMetaDescription: `Explore ${fallbackTitle || "this page"} at NIGAPE, the premier institute for Generative AI and Prompt Engineering.`,
    defaultKeywords: "generative AI, prompt engineering, NIGAPE, AI courses Delhi",
    defaultCanonicalUrl: `${siteUrl}${normalized}`,
  };
}

/**
 * Normalizes URL path (e.g. removes trailing slash except for root).
 */
export function normalizePath(p) {
  if (!p || typeof p !== "string") return "/";
  let clean = p.trim();
  if (!clean.startsWith("/")) clean = "/" + clean;
  if (clean.length > 1 && clean.endsWith("/")) clean = clean.slice(0, -1);
  return clean;
}

/**
 * Reads local JSON store with safe error handling.
 */
function readJsonStore() {
  try {
    if (fs.existsSync(SEO_STORE_PATH)) {
      const raw = fs.readFileSync(SEO_STORE_PATH, "utf-8");
      return JSON.parse(raw || "{}");
    }
  } catch (err) {
    console.warn("[SEO] Could not read JSON SEO store:", err.message);
  }
  return {};
}

/**
 * Writes to local JSON store atomically.
 */
function writeJsonStore(data) {
  try {
    const dir = path.dirname(SEO_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SEO_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("[SEO] Could not write JSON SEO store:", err.message);
    return false;
  }
}

/**
 * Fetches SEO record from Prisma database with try/catch fallback.
 */
async function getDbSeoRecord(normalizedPath) {
  try {
    if (prisma?.seoMetadata?.findUnique) {
      return await prisma.seoMetadata.findUnique({
        where: { path: normalizedPath },
      });
    }
  } catch {
    // Database table may not exist yet or connection is unavailable; safe fallback
  }
  return null;
}

/**
 * Fetches all SEO records from Prisma database.
 */
async function getAllDbSeoRecords() {
  try {
    if (prisma?.seoMetadata?.findMany) {
      return await prisma.seoMetadata.findMany();
    }
  } catch {
    // Database fallback
  }
  return null;
}

/**
 * Retrieves the effective SEO configuration for a given path.
 * Merges custom overrides on top of defaults.
 */
export async function getSeoForPath(targetPath) {
  const normalized = normalizePath(targetPath);
  const baseline = getBaselineSeo(normalized);

  let custom = null;

  // 1. Try Database
  const dbRecord = await getDbSeoRecord(normalized);
  if (dbRecord) {
    custom = dbRecord;
  } else {
    // 2. Try JSON store fallback
    const jsonStore = readJsonStore();
    if (jsonStore[normalized]) {
      custom = jsonStore[normalized];
    }
  }

  const isCustomized = Boolean(
    custom &&
      (custom.metaTitle ||
        custom.metaDescription ||
        custom.keywords ||
        custom.canonicalUrl ||
        custom.ogImage ||
        custom.noIndex !== undefined)
  );

  return {
    path: normalized,
    entityType: custom?.entityType || baseline.entityType,
    entityName: custom?.entityName || baseline.entityName,
    isCustomized,
    metaTitle: custom?.metaTitle?.trim() || baseline.defaultMetaTitle,
    metaDescription: custom?.metaDescription?.trim() || baseline.defaultMetaDescription,
    keywords: custom?.keywords?.trim() || baseline.defaultKeywords,
    canonicalUrl: custom?.canonicalUrl?.trim() || baseline.defaultCanonicalUrl,
    ogTitle: custom?.ogTitle?.trim() || custom?.metaTitle?.trim() || baseline.defaultMetaTitle,
    ogDescription: custom?.ogDescription?.trim() || custom?.metaDescription?.trim() || baseline.defaultMetaDescription,
    ogImage: custom?.ogImage?.trim() || "/Nigapepic/nigape1.png",
    noIndex: Boolean(custom?.noIndex),
    defaultMetaTitle: baseline.defaultMetaTitle,
    defaultMetaDescription: baseline.defaultMetaDescription,
    defaultKeywords: baseline.defaultKeywords,
    defaultCanonicalUrl: baseline.defaultCanonicalUrl,
    updatedAt: custom?.updatedAt || null,
  };
}

/**
 * Returns all managed pages & courses with their current SEO status.
 */
export async function getAllSeoEntries() {
  const dbRecords = (await getAllDbSeoRecords()) || [];
  const jsonStore = readJsonStore();

  const dbMap = new Map();
  dbRecords.forEach((r) => dbMap.set(r.path, r));

  const allBaselines = [...STATIC_PAGES, ...getCoursesSeoDefaults()];
  const handledPaths = new Set();

  const entries = allBaselines.map((baseline) => {
    handledPaths.add(baseline.path);
    const custom = dbMap.get(baseline.path) || jsonStore[baseline.path] || null;

    const isCustomized = Boolean(
      custom &&
        (custom.metaTitle ||
          custom.metaDescription ||
          custom.keywords ||
          custom.canonicalUrl ||
          custom.ogImage ||
          custom.noIndex !== undefined)
    );

    return {
      path: baseline.path,
      entityType: baseline.entityType,
      entityName: baseline.entityName,
      isCustomized,
      metaTitle: custom?.metaTitle?.trim() || baseline.defaultMetaTitle,
      metaDescription: custom?.metaDescription?.trim() || baseline.defaultMetaDescription,
      keywords: custom?.keywords?.trim() || baseline.defaultKeywords,
      canonicalUrl: custom?.canonicalUrl?.trim() || baseline.defaultCanonicalUrl,
      ogTitle: custom?.ogTitle?.trim() || custom?.metaTitle?.trim() || baseline.defaultMetaTitle,
      ogDescription: custom?.ogDescription?.trim() || custom?.metaDescription?.trim() || baseline.defaultMetaDescription,
      ogImage: custom?.ogImage?.trim() || "/Nigapepic/nigape1.png",
      noIndex: Boolean(custom?.noIndex),
      defaultMetaTitle: baseline.defaultMetaTitle,
      defaultMetaDescription: baseline.defaultMetaDescription,
      defaultKeywords: baseline.defaultKeywords,
      defaultCanonicalUrl: baseline.defaultCanonicalUrl,
      updatedAt: custom?.updatedAt || null,
    };
  });

  // Include any custom entries that might have been saved for other paths
  const otherKeys = new Set([...dbMap.keys(), ...Object.keys(jsonStore)]);
  otherKeys.forEach((p) => {
    if (!handledPaths.has(p)) {
      const custom = dbMap.get(p) || jsonStore[p];
      if (custom) {
        const baseline = getBaselineSeo(p);
        entries.push({
          path: p,
          entityType: custom.entityType || baseline.entityType,
          entityName: custom.entityName || baseline.entityName,
          isCustomized: true,
          metaTitle: custom.metaTitle?.trim() || baseline.defaultMetaTitle,
          metaDescription: custom.metaDescription?.trim() || baseline.defaultMetaDescription,
          keywords: custom.keywords?.trim() || baseline.defaultKeywords,
          canonicalUrl: custom.canonicalUrl?.trim() || baseline.defaultCanonicalUrl,
          ogTitle: custom.ogTitle?.trim() || custom.metaTitle?.trim() || baseline.defaultMetaTitle,
          ogDescription: custom.ogDescription?.trim() || custom.metaDescription?.trim() || baseline.defaultMetaDescription,
          ogImage: custom.ogImage?.trim() || "/Nigapepic/nigape1.png",
          noIndex: Boolean(custom.noIndex),
          defaultMetaTitle: baseline.defaultMetaTitle,
          defaultMetaDescription: baseline.defaultMetaDescription,
          defaultKeywords: baseline.defaultKeywords,
          defaultCanonicalUrl: baseline.defaultCanonicalUrl,
          updatedAt: custom.updatedAt || null,
        });
      }
    }
  });

  return entries;
}

/**
 * Saves or updates custom SEO for a given path.
 */
export async function saveSeoEntry({
  path: rawPath,
  entityType,
  entityName,
  metaTitle,
  metaDescription,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex,
}) {
  const normalized = normalizePath(rawPath);
  const baseline = getBaselineSeo(normalized);

  const payload = {
    path: normalized,
    entityType: entityType || baseline.entityType,
    entityName: entityName || baseline.entityName,
    metaTitle: metaTitle !== undefined ? metaTitle.trim() : null,
    metaDescription: metaDescription !== undefined ? metaDescription.trim() : null,
    keywords: keywords !== undefined ? keywords.trim() : null,
    canonicalUrl: canonicalUrl !== undefined ? canonicalUrl.trim() : null,
    ogTitle: ogTitle !== undefined ? ogTitle.trim() : null,
    ogDescription: ogDescription !== undefined ? ogDescription.trim() : null,
    ogImage: ogImage !== undefined ? ogImage.trim() : null,
    noIndex: Boolean(noIndex),
    updatedAt: new Date().toISOString(),
  };

  // 1. Save to JSON store
  const jsonStore = readJsonStore();
  jsonStore[normalized] = payload;
  writeJsonStore(jsonStore);

  // 2. Save to Database (if accessible)
  try {
    if (prisma?.seoMetadata?.upsert) {
      await prisma.seoMetadata.upsert({
        where: { path: normalized },
        update: {
          entityType: payload.entityType,
          entityName: payload.entityName,
          metaTitle: payload.metaTitle,
          metaDescription: payload.metaDescription,
          keywords: payload.keywords,
          canonicalUrl: payload.canonicalUrl,
          ogTitle: payload.ogTitle,
          ogDescription: payload.ogDescription,
          ogImage: payload.ogImage,
          noIndex: payload.noIndex,
        },
        create: {
          path: normalized,
          entityType: payload.entityType,
          entityName: payload.entityName,
          metaTitle: payload.metaTitle,
          metaDescription: payload.metaDescription,
          keywords: payload.keywords,
          canonicalUrl: payload.canonicalUrl,
          ogTitle: payload.ogTitle,
          ogDescription: payload.ogDescription,
          ogImage: payload.ogImage,
          noIndex: payload.noIndex,
        },
      });
    }
  } catch (err) {
    console.warn("[SEO] Could not write to Prisma DB (falling back to JSON store):", err.message);
  }

  return payload;
}

/**
 * Resets a path's SEO back to its baseline defaults.
 */
export async function resetSeoEntry(rawPath) {
  const normalized = normalizePath(rawPath);

  // 1. Remove from JSON store
  const jsonStore = readJsonStore();
  if (jsonStore[normalized]) {
    delete jsonStore[normalized];
    writeJsonStore(jsonStore);
  }

  // 2. Remove from Database
  try {
    if (prisma?.seoMetadata?.delete) {
      await prisma.seoMetadata.delete({
        where: { path: normalized },
      });
    }
  } catch {
    // Record may not exist in DB
  }

  return getBaselineSeo(normalized);
}

/**
 * Convenient helper for Next.js App Router generateMetadata().
 */
export async function buildPageMetadata({
  path: targetPath,
  defaultTitle,
  defaultDescription,
  defaultKeywords,
  defaultCanonical,
  defaultOgImage,
  defaultType = "website",
}) {
  const seo = await getSeoForPath(targetPath);

  const title = seo.metaTitle || defaultTitle;
  const description = seo.metaDescription || defaultDescription;
  const canonical = seo.canonicalUrl || defaultCanonical;
  const keywords = seo.keywords || defaultKeywords;
  const ogImage = seo.ogImage || defaultOgImage;

  // Convert keywords string to array for Next.js if provided as string
  const keywordsArray =
    typeof keywords === "string"
      ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : Array.isArray(keywords)
      ? keywords
      : undefined;

  const metadata = {
    title,
    description,
    keywords: keywordsArray,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: canonical,
      type: defaultType,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
  };

  if (seo.noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}
