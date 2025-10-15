import CardLiner from '../_components/CardLiner';
import { BsTelephone, BsEnvelope } from 'react-icons/bs';
import { useTranslations } from 'next-intl';

export default function ContactCards() {
  const t = useTranslations('contact');
  return (
    <>
      <CardLiner
        title={t('phone.title')}
        text={t('phone.text')}
        icon={
          <BsTelephone
            aria-hidden="true"
            size={20}
            className="text-primary-150"
          />
        }
        action="tel"
      />
      <CardLiner
        title={t('email.bd.title')}
        text={t('email.bd.text')}
        icon={
          <BsEnvelope
            aria-hidden="true"
            size={20}
            className="text-primary-150"
          />
        }
        action="mailto"
      />
      <CardLiner
        title={t('email.hr.title')}
        text={t('email.hr.text')}
        icon={
          <BsEnvelope
            aria-hidden="true"
            size={20}
            className="text-primary-150"
          />
        }
        action="mailto"
      />
    </>
  );
}
