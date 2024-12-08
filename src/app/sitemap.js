export default function sitemap() {
  const siteUrl = "https://ecmc-ksa.com";

  return [
    {
      url: `${siteUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar`,
        },
      },
    },
    {
      url: `${siteUrl}/en/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/services`,
        },
      },
    },
    {
      url: `${siteUrl}/en/services/strategies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/strategies`,
        },
      },
    },
    {
      url: `${siteUrl}/en/services/organizational-excellency`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/services/organizational-excellency`,
        },
      },
    },
    {
      url: `${siteUrl}/en/services/marketing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/services/marketing`,
        },
      },
    },
    {
      url: `${siteUrl}/en/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/about`,
        },
      },
    },
    {
      url: `${siteUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/contact`,
        },
      },
    },
    {
      url: `${siteUrl}/en/publications`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/publications`,
        },
      },
    },
    {
      url: `${siteUrl}/en/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/careers`,
        },
      },
    },
    {
      url: `${siteUrl}/en/team`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          ar: `${siteUrl}/ar/team`,
        },
      },
    },
  ];
}
