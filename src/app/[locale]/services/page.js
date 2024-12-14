import SectionDesc from "../../_sections/SectionDesc";
import SectionHero from "../../_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesCards from "../../_sections/ServicesCards";
import Section from "../../_components/Section";
import Row from "../../_components/Row";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.main"),
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <SectionHero service="overview" section="OurServices" />
      <SectionDesc service="overview" section="OurServices" />
      <Section>
        <Row
          grid={3}
          classes="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12 border-t"
        >
          <ServicesCards />
        </Row>
      </Section>
    </main>
  );
}
