import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { getItems } from "../_utils/helpers";
import Button from "../_components/Button";
import {
  BsCardChecklist,
  BsMortarboard,
  BsLightningCharge,
} from "react-icons/bs";
import JobHeading from "../_components/JobHeading";
import { notFound } from "next/navigation";

export default function JobDetails({ job }) {
  const t = useTranslations("jobs");
  const b = useTranslations("Buttons");
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
            title={t("titles.responsibilities")}
            icon={<BsCardChecklist size={25} className="text-primary-170" />}
          />
        )}
        {qualifications && (
          <JobList
            jobArray={qualifications}
            title={t("titles.qualifications")}
            icon={<BsMortarboard size={25} className="text-primary-170" />}
          />
        )}

        {skills && (
          <JobList
            jobArray={skills}
            title={t("titles.skills")}
            icon={<BsLightningCharge size={25} className="text-primary-170" />}
          />
        )}
        {educationAndAcademicExperience && (
          <JobList
            jobArray={educationAndAcademicExperience}
            title={t("titles.educationAndAcademicExperience")}
            icon={<BsLightningCharge size={25} className="text-primary-170" />}
          />
        )}
        <Button className="self-center" href={`/careers/jobs/${job}/apply`}>
          {b("apply")}
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
          <li key={i} className="text-gray-800 text-base leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
