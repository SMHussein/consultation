export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: "https://www.ecmc-ksa.com/sitemap.xml",
  };
}
