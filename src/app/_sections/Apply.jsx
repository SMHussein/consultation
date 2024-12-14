import { jobApply } from "../_api/serverFunctions";
import Form from "../_components/Form";
import JobHeading from "../_components/JobHeading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

const inputs = [
  { id: "name", type: "text", required: true },
  { id: "email", type: "email", required: true },
  { id: "phone", type: "tel", required: true },
  { id: "location", type: "text", required: true },
  { id: "company", type: "text", required: false },
  { id: "linkedin", type: "text", required: true },
  { id: "nationality", type: "text", required: true },
  {
    id: "university",
    type: "text",
    required: true,
  },
  { id: "arabic", type: "text", required: true },
  { id: "english", type: "text", required: true },
  { id: "salary", type: "text", required: true },
  { id: "cv", type: "file", required: true, accept: "application/pdf" },
  {
    id: "extraInfo",
    type: "text",
    required: false,
  },
];

export default function JobApply({ job }) {
  const t = useTranslations("apply");
  const j = useTranslations(`jobs`);

  if (!j.has(`${job}.title`)) return notFound();

  return (
    <Section>
      <Row>
        <JobHeading
          title={j(`${job}.title`)}
          location={j(`${job}.location`)}
          type={j(`${job}.type`)}
        />
        <Form inputs={inputs} action={jobApply} job={job} />
      </Row>
    </Section>
  );
}
