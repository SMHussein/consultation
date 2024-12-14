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
      url: `${siteUrl}/careers/jobs/marketing-specialist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/marketing-specialist`,
          ar: `${siteUrl}/ar/careers/jobs/marketing-specialist`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/associate-consultant`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/jobs/associate-consultant`,
          ar: `${siteUrl}/ar/careers/jobs/associate-consultant`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/manager`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/manager`,
          ar: `${siteUrl}/ar/careers/jobs/manager`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/market-research-associate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/market-research-associate`,
          ar: `${siteUrl}/ar/careers/jobs/market-research-associate`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/finance-manager`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/finance-manager`,
          ar: `${siteUrl}/ar/careers/jobs/finance-manager`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/office-administrator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/office-administrator`,
          ar: `${siteUrl}/ar/careers/jobs/office-administrator`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/hr`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/hr`,
          ar: `${siteUrl}/ar/careers/jobs/hr`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/it`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/it`,
          ar: `${siteUrl}/ar/careers/jobs/it`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/partnership-specialist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/partnership-specialist`,
          ar: `${siteUrl}/ar/careers/jobs/partnership-specialist`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/senior-advisory-operations-specialist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/senior-advisory-operations-specialist`,
          ar: `${siteUrl}/ar/careers/jobs/senior-advisory-operations-specialist`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/marketing-specialist/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/marketing-specialist/apply`,
          ar: `${siteUrl}/ar/careers/jobs/marketing-specialist/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/associate-consultant/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/jobs/associate-consultant/apply`,
          ar: `${siteUrl}/ar/careers/jobs/associate-consultant/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/manager/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/manager/apply`,
          ar: `${siteUrl}/ar/careers/jobs/manager/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/market-research-associate/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/market-research-associate/apply`,
          ar: `${siteUrl}/ar/careers/jobs/market-research-associate/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/finance-manager/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/finance-manager/apply`,
          ar: `${siteUrl}/ar/careers/jobs/finance-manager/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/office-administrator/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/office-administrator/apply`,
          ar: `${siteUrl}/ar/careers/jobs/office-administrator/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/hr/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/hr/apply`,
          ar: `${siteUrl}/ar/careers/jobs/hr/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/it/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/it/apply`,
          ar: `${siteUrl}/ar/careers/jobs/it/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/partnership-specialist/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/partnership-specialist/apply`,
          ar: `${siteUrl}/ar/careers/jobs/partnership-specialist/apply`,
        },
      },
    },
    {
      url: `${siteUrl}/careers/jobs/senior-advisory-operations-specialist/apply`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          en: `${siteUrl}/careers/job/senior-advisory-operations-specialist/apply`,
          ar: `${siteUrl}/ar/careers/jobs/senior-advisory-operations-specialist/apply`,
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
