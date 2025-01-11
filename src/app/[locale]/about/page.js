import SectionDesc from "@/src/app/_sections/SectionDesc";
import SectionHero from "@/src/app/_sections/SectionHero";
import Specs from "@/src/app/_sections/Specs";
import Values from "@/src/app/_sections/Values";
import Vision from "@/src/app/_sections/Vision";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { canonicalLocale } from "@/src/app/_utils/helpers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(locale)}/about`,
    },
  };
}

export default async function About({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SectionHero service="about" section="CompanyData" />
      <SectionDesc service="about" section="CompanyData" />
      <Vision />
      <Values />
      <Specs />
    </main>
  );
}
