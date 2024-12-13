export default function sitemap() {
  const siteUrl = "https://ecmc-ksa.com";

  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteUrl}`,
          ar: `${siteUrl}/ar`,
        },
      },
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}/services`,
          ar: `${siteUrl}/ar/services`,
        },
      },
    },
    {
      url: `${siteUrl}/services/strategies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/services/strategies`,
          ar: `${siteUrl}/ar/services/strategies`,
        },
      },
    },
    {
      url: `${siteUrl}/services/organizational-excellency`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/services/organizational-excellency`,
          ar: `${siteUrl}/ar/services/organizational-excellency`,
        },
      },
    },
    {
      url: `${siteUrl}/services/marketing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/services/marketing`,
          ar: `${siteUrl}/ar/services/marketing`,
        },
      },
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${siteUrl}/about`,
          ar: `${siteUrl}/ar/about`,
        },
      },
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/contact`,
          ar: `${siteUrl}/ar/contact`,
        },
      },
    },
    {
      url: `${siteUrl}/publications`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: {
          en: `${siteUrl}/publications`,
          ar: `${siteUrl}/ar/publications`,
        },
      },
    },
    {
      url: `${siteUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers`,
          ar: `${siteUrl}/ar/careers`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/jobs`,
          ar: `${siteUrl}/ar/careers/jobs`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/marketingSpecialist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/marketingSpecialists`,
          ar: `${siteUrl}/ar/careers/jobs/marketingSpecialist`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/associateConsultant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/jobs/associateConsultant`,
          ar: `${siteUrl}/ar/careers/jobs/associateConsultant`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/marketingSpecialist/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/marketingSpecialists/apply`,
          ar: `${siteUrl}/ar/careers/jobs/marketingSpecialist/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/associateConsultant/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/jobs/associateConsultant/apply`,
          ar: `${siteUrl}/ar/careers/jobs/associateConsultant/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${siteUrl}/team`,
          ar: `${siteUrl}/ar/team`,
        },
      },
    },
  ];
}
