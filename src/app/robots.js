const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bingbot",
  "BingPreview",
];

export default function robots() {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.nigape.com").replace(/\/+$/, "");
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/admin", "/api"] })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}