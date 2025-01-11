export default function sitemap() {
  const siteUrl = "https://www.ecmc-ksa.com";

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDate(new Date());

  return [
    {
      url: `${siteUrl}`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services/strategies`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/services/organizational-excellency`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/services/marketing`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: formattedDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: formattedDate,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/team`,
      lastModified: formattedDate,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/publications`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/marketing-specialist`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/associate-consultant`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/manager`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/market-research-associate`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/finance-manager`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/office-administrator`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/hr`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/it`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/partnership-specialist`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/careers/jobs/senior-advisory-operations-specialist`,
      lastModified: formattedDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
