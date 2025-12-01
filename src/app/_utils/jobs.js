export const jobIds = {
  'associate-consultant': 1,
  'marketing-specialist': 2,
  manager: 3,
  'market-research-associate': 4,
  'finance-manager': 5,
  'office-administrator': 6,
  hr: 7,
  it: 8,
  'partnership-specialist': 9,
  'senior-advisory-operations-specialist': 10,
};

export const jobSlugById = Object.entries(jobIds).reduce((acc, [slug, id]) => {
  acc[id] = slug;
  return acc;
}, {});
