import Heading from '../_components/Heading';
import Row from '../_components/Row';
import Section from '../_components/Section';
import ServiceItem from '../_components/ServiceItem';
import { useTranslations, useMessages } from 'next-intl';
import { getItems } from '../_utils/helpers';

export default function Services() {
  const t = useTranslations('OurServices');
  const messages = useMessages();
  const keys = Object.keys(messages.OurServices.services);

  return (
    <Section isLight={false}>
      <Row grid={3}>
        <Heading classes="text-primary-100 text-center mb-6">
          {t('title')}
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          {keys.map((key, i) => (
            <ServiceItem
              key={`service-${i}`}
              service={getItems(t, `OurServices.services.${key}.items`)}
              href={t(`services.${key}.href`)}
              title={t(`services.${key}.title`)}
              btnText={t(`services.${key}.btnText`)}
              src={t(`services.${key}.src`)}
            />
          ))}
        </div>
      </Row>
    </Section>
  );
}
