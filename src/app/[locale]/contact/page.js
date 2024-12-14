import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionHero from "../../_sections/SectionHero";
import Section from "../../_components/Section";
import Row from "../../_components/Row";
import ContactCards from "../../_sections/ContactCards";
import Form from "../../_components/Form";
import ContactHeading from "../../_components/ContactHeading";
import { sendMessage } from "../../_api/serverFunctions";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("contact"),
  };
}

const inputs = [
  { id: "name", type: "text", required: true },
  { id: "phone", type: "tel", required: true },
  { id: "email", type: "email", required: true },
  { id: "message", type: "text", required: true },
];

export default async function Contact({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SectionHero service="hero" section="contact" />
      <Section>
        <Row>
          <ContactHeading />
          <div className="grid grid-cols-1 w-full sm:grid-cols-2 items-start sm:w-auto sm:justify-items-start gap-8">
            <div className="flex flex-col justify-center gap-6">
              <ContactCards />
            </div>
            <Form inputs={inputs} action={sendMessage} shouldMail={true} />
          </div>
        </Row>
      </Section>
    </main>
  );
}
