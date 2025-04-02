import { getTranslations, setRequestLocale } from 'next-intl/server';
import { canonicalLocale } from '@/src/app/_utils/helpers';
import ServicesPage from '@/src/app/_sections/ServicesPage';

export async function generateMetadata({ params }) {
  const { locale, service } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  if (!t.has(`services.${service}`)) return null;

  return {
    title: t(`services.${service}`),
    description: t('services.description'),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(
        locale
      )}/services/${service}`,
    },
  };
}

export default async function Page({ params }) {
  const { locale, service } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServicesPage service={service} />
    </main>
  );
}
