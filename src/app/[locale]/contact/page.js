import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionHero from "@/src/app/_sections/SectionHero";
import Section from "@/src/app/_components/Section";
import Row from "@/src/app/_components/Row";
import ContactCards from "@/src/app/_sections/ContactCards";
import Form from "@/src/app/_components/Form";
import ContactHeading from "@/src/app/_components/ContactHeading";
import { sendMessage } from "@/src/app/_api/serverFunctions";
import { canonicalLocale } from "@/src/app/_utils/helpers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(locale)}/contact`,
    },
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
