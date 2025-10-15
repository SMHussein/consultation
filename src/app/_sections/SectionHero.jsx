import Image from 'next/image';
import Row from '../_components/Row';
import Section from '../_components/Section';
import Heading from '../_components/Heading';
import { useTranslations } from 'next-intl';

export default function SectionHero({ service, section }) {
  const t = useTranslations(`${section}`);

  return (
    <Section noBg={true} classes="bg-black/70">
      <Image
        src={t(`${service}.src`)}
        fill
        className="object-cover -z-10"
        alt="Hero Image"
        loading="eager"
      />
      <Row classes="flex items-center justify-center  min-h-[65svh]">
        <Heading type="primary" classes="text-white text-balance max-w-[50rem]">
          {t(`${service}.title`)}
        </Heading>
      </Row>
    </Section>
  );
}
