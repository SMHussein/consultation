import { useTranslations } from 'next-intl';
import ServiceDesc from '@/src/app/_sections/SectionDesc';
import ServiceHero from '@/src/app/_sections/SectionHero';
import { notFound } from 'next/navigation';

export default function ServicesPage({ service }) {
  const t = useTranslations('OurServices');

  if (!t.has(`services.${service}`)) return notFound();
  return (
    <>
      <ServiceHero service={`services.${service}`} section="OurServices" />
      <ServiceDesc service={`services.${service}`} section="OurServices" />
    </>
  );
}
