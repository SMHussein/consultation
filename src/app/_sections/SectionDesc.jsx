import Heading from '../_components/Heading';
import Row from '../_components/Row';
import Section from '../_components/Section';
import Button from '@/src/app/_components/Button';
import { useTranslations } from 'next-intl';

export default function SectionDesc({ service, section }) {
  const t = useTranslations(`${section}`);
  const b = useTranslations('Buttons');
  const servicePrefix = service;
  return (
    <Section>
      <Row grid={2} classes="flex flex-col gap-6">
        <Heading type="secondary"> {t(`${service}.subTitle`)}</Heading>
        {t(`${servicePrefix}.text1`) && <p>{t(`${servicePrefix}.text1`)}</p>}
        {t(`${servicePrefix}.text2`) && <p>{t(`${servicePrefix}.text2`)}</p>}
        {t(`${servicePrefix}.text3`) && <p>{t(`${servicePrefix}.text3`)}</p>}
        <Button href="/contact" className="self-start">
          {b('contact')}
        </Button>
      </Row>
    </Section>
  );
}
