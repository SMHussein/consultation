import Card from '../_components/Card';
import { BsBagCheck } from 'react-icons/bs';

import { useTranslations, useMessages } from 'next-intl';

export default function ServicesCards() {
  const t = useTranslations('OurServices');
  const messages = useMessages();
  const keys = Object.keys(messages.OurServices.services);

  return (
    <>
      {keys.map((key, i) => (
        <Card
          key={i}
          title={t(`services.${key}.title`)}
          text={t(`services.${key}.subTitle`)}
          icon={<BsBagCheck size={20} />}
          href={`/services/${t(`services.${key}.href`)}`}
        />
      ))}
    </>
  );
}
