import { jobApply } from '../_api/serverFunctions';
import Form from '../_components/Form';
import JobHeading from '../_components/JobHeading';
import Row from '../_components/Row';
import Section from '../_components/Section';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

const inputs = [
  { id: 'name', type: 'text', required: true, autocomplete: 'name' },
  { id: 'email', type: 'email', required: true, autocomplete: 'email' },
  { id: 'phone', type: 'tel', required: true, autocomplete: 'tel' },
  {
    id: 'location',
    type: 'text',
    required: true,
    autocomplete: 'address-level1',
  },
  {
    id: 'company',
    type: 'text',
    required: false,
    autocomplete: 'organization',
  },
  { id: 'linkedin', type: 'text', required: true, autocomplete: 'url' },
  { id: 'nationality', type: 'text', required: true },
  {
    id: 'university',
    type: 'text',
    required: true,
    autocomplete: 'organization',
  },
  { id: 'arabic', type: 'text', required: true },
  { id: 'english', type: 'text', required: true },
  { id: 'salary', type: 'text', required: true },
  { id: 'cv', type: 'file', required: true, accept: 'application/pdf' },
  {
    id: 'extraInfo',
    type: 'text',
    required: false,
  },
];

export default function JobApply({ job, user }) {
  const t = useTranslations('apply');
  const j = useTranslations(`jobs`);

  if (!j.has(`${job}.title`)) return notFound();

  // Get user name from metadata, fallback to email
  const userName =
    user?.user_metadata?.name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.display_name ||
    '';
  const userEmail = user?.email || '';

  return (
    <Section>
      <Row>
        <JobHeading
          title={j(`${job}.title`)}
          location={j(`${job}.location`)}
          type={j(`${job}.type`)}
        />
        <Form
          inputs={inputs}
          action={jobApply}
          job={job}
          defaultValues={{ name: userName, email: userEmail }}
          readOnlyFields={['name', 'email']}
        />
      </Row>
    </Section>
  );
}
