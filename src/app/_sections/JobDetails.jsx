import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import { useTranslations } from 'next-intl';
import { getItems } from '@/src/app/_utils/helpers';
import Button from '@/src/app/_components/Button';
import {
  BsCardChecklist,
  BsMortarboard,
  BsLightningCharge,
} from 'react-icons/bs';
import JobHeading from '../_components/JobHeading';
import { notFound } from 'next/navigation';

export default function JobDetails({ job }) {
  const t = useTranslations('jobs');
  const b = useTranslations('Buttons');
  const responsibilities = getItems(t, `jobs.${job}.responsibilities`);
  const qualifications = getItems(t, `jobs.${job}.qualifications`);
  const skills = getItems(t, `jobs.${job}.skills`);
  const educationAndAcademicExperience = getItems(
    t,
    `jobs.${job}.educationAndAcademicExperience`
  );
  if (!t.has(`${job}.title`)) return notFound();
  return (
    <Section>
      <Row grid={3} classes="flex flex-col gap-8 leading-relaxed">
        <JobHeading
          title={t(`${job}.title`)}
          location={t(`${job}.location`)}
          type={t(`${job}.type`)}
        />
        <p>{t(`${job}.summary`)}</p>
        {responsibilities && (
          <JobList
            jobArray={responsibilities}
            title={t('titles.responsibilities')}
            icon={
              <BsCardChecklist
                aria-hidden="true"
                size={25}
                className="text-primary-170"
              />
            }
          />
        )}
        {qualifications && (
          <JobList
            jobArray={qualifications}
            title={t('titles.qualifications')}
            icon={
              <BsMortarboard
                aria-hidden="true"
                size={25}
                className="text-primary-170"
              />
            }
          />
        )}

        {skills && (
          <JobList
            jobArray={skills}
            title={t('titles.skills')}
            icon={
              <BsLightningCharge
                aria-hidden="true"
                size={25}
                className="text-primary-170"
              />
            }
          />
        )}
        {educationAndAcademicExperience && (
          <JobList
            jobArray={educationAndAcademicExperience}
            title={t('titles.educationAndAcademicExperience')}
            icon={
              <BsLightningCharge
                aria-hidden="true"
                size={25}
                className="text-primary-170"
              />
            }
          />
        )}
        <Button
          className="self-center"
          rel="nofollow"
          href={`/careers/jobs/${job}/apply`}
        >
          {b('apply')}
        </Button>
      </Row>
    </Section>
  );
}

function JobList({ jobArray, title, icon }) {
  return (
    <div className="flex flex-col gap-4">
      <Heading classes="flex items-center gap-4">
        {icon}
        {title}
      </Heading>
      <ul className="flex flex-col gap-2 list-disc ps-6 marker:text-primary-170 marker:text-lg">
        {jobArray.map((item, i) => (
          <li
            key={i}
            className="text-gray-800 dark:text-white text-base leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
