import Image from 'next/image';
import Row from '../_components/Row';
import Section from '../_components/Section';
import Heading from '../_components/Heading';
import { useTranslations } from 'next-intl';

export default function SectionHero({ service, section }) {
  const t = useTranslations(`${section}`);

  return (
    <Section noBg={true}>
      <Image
        src={t(`${service}.src`)}
        fill
        className="object-cover -z-10"
        alt="Hero Image"
        loading="eager"
      />
      <Row classes="flex items-center justify-center  min-h-[65svh]">
        <div className="absolute inset-0 bg-black/70 -z-10"></div>
        <Heading type="primary" classes="text-white text-balance max-w-[50rem]">
          {t(`${service}.title`)}
        </Heading>
      </Row>
    </Section>
  );
}
