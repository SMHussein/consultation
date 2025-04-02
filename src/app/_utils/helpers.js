import json from '@/messages/en.json';

export function getItems(t, jsonPath) {
  const keys = jsonPath.split('.');
  const roleLength = keys.reduce((obj, key) => obj && obj[key], json)?.length;
  if (!roleLength) return null;
  const roleType = jsonPath.split('.').slice(1).join('.');
  return Array.from({ length: roleLength }, (_, i) => t(`${roleType}.${i}`));
}

export function canonicalLocale(local) {
  return local === 'en' ? '' : `/${local}`;
}

export function getMetadata(locale) {
  if (locale === 'ar') {
    return {
      title: {
        template: '%s',
        default:
          'ايميرج كبابليتيز للاستشارات الإدارية - حلول استشارية استراتيجية ومستدامة',
      },
      description:
        'شركة ايميرج كبابليتيز للاستشارات الإدارية هي شركة استشارية رائدة في المملكة العربية السعودية.',
      author: 'Emerge Capabilities',
      alternates: {
        canonical: `https://www.ecmc-ksa.com/${locale}`,
      },
      keywords:
        'خدمات استشارية في السعودية, حلول استشارية استراتيجية, استشارات التحول الرقمي, الحوكمة وإدارة المخاطر , النمو المستدام , التميز التنظيمي, أبحاث السوق في السعودية, الحوكمة, إدارة التغيير, تطوير الاستراتيجيات , تخطيط استراتيجي, استدامة الأعمال, إدارة المخاطر, إدارة الأداء, الابتكار  ',
      openGraph: {
        type: 'website',
        url: 'https://www.ecmc-ksa.com',
        title:
          'ايميرج كبابليتيز للاستشارات الإدارية - استشارية استراتيجية ومستدامة',
        description:
          'شركة ايميرج كبابليتيز للاستشارات الإدارية هي شركة استشارية رائدة في المملكة العربية السعودية.',
      },
      metadataBase: new URL('https://www.ecmc-ksa.com'),
    };
  }
  return {
    title: {
      template: '%s',
      default: 'ECMC - Management Consulting Solutions',
    },
    description:
      'ECMC is a leading consulting company in Saudi Arabia. With expertise in strategy, digital transformation and risk management.',
    author: 'Emerge Capabilities',
    alternates: {
      canonical: 'https://www.ecmc-ksa.com',
    },
    keywords:
      'Saudi Arabia consulting services, consulting, Digital transformation, Risk compliance, business growth, Organizational excellence, Market research Saudi Arabia, Environmental Social Governance (ESG), Corporate strategy, Strategic planning, Business continuity, Risk management, Performance management, strategy consulting, Economy consulting, strategies',
    openGraph: {
      type: 'website',
      url: 'https://www.ecmc-ksa.com',
      title: 'ECMC - Management Consulting Solutions',
      description:
        'ECMC is a leading consulting company in Saudi Arabia. With expertise in strategy, digital transformation and risk management.',
    },
    metadataBase: new URL('https://www.ecmc-ksa.com'),
  };
}

export function toCamelCase(str) {
  return str
    .toLowerCase()
    .split(/[\s-_]+/) // Split on spaces, hyphens, or underscores
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('');
}

export function splitByComma(str) {
  return str
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '');
}
