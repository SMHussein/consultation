export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/*apply*"],
    },
    sitemap: "https://www.ecmc-ksa.com/sitemap.xml",
  };
}
