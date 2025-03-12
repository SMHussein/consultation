import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionHero from '@/src/app/_sections/SectionHero';
import CareersIntro from '@/src/app/_sections/CareersIntro';
import CareersNeeds from '@/src/app/_sections/CareersNeeds';
import { canonicalLocale } from '@/src/app/_utils/helpers';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('careers.title'),
    description: t('careers.description'),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(locale)}/careers`,
    },
  };
}

export default async function Careers({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectionHero service="hero" section="careers" />
      <CareersIntro />
      <CareersNeeds />
    </>
  );
}
