import Image from 'next/image';
import Heading from '../_components/Heading';
import Section from '../_components/Section';
import Row from '../_components/Row';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <Section noBg={true} classes="bg-black/70">
      <Image
        src="/hero.jpg"
        fill
        className="object-cover -z-10"
        alt="Hero Section background Image - building with modern bridges"
        loading="eager"
      />
      <Row classes="relative flex items-center justify-center min-h-[65svh] z-10">
        <Heading type="primary" classes="text-white text-balance max-w-[50rem]">
          {t('title')}
        </Heading>
      </Row>
    </Section>
  );
}
