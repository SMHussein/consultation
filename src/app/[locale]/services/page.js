import SectionDesc from "@/src/app/_sections/SectionDesc";
import SectionHero from "@/src/app/_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesCards from "@/src/app/_sections/ServicesCards";
import Section from "@/src/app/_components/Section";
import Row from "@/src/app/_components/Row";
import { canonicalLocale } from "@/src/app/_utils/helpers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.main"),
    description: t("services.description"),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(locale)}/services`,
    },
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
