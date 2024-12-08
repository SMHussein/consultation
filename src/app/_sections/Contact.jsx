import Form from "../_components/Form";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { newsLetterSubsribe } from "../_api/serverFunctions";

const inputs = [
  { id: "name", type: "text", required: true },
  { id: "email", type: "email", required: true },
];

export default function Contact() {
  const t = useTranslations("newsletter");

  return (
    <Section>
      <Row grid={2}>
        <Heading type="secondary" classes="mb-6 text-center">
          {t("title")}
        </Heading>
        <Form inputs={inputs} action={newsLetterSubsribe} />
      </Row>
    </Section>
  );
}
