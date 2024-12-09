import SectionDesc from "../../_sections/SectionDesc";
import SectionHero from "../../_sections/SectionHero";
import Specs from "../../_sections/Specs";
import Values from "../../_sections/Values";
import Vision from "../../_sections/Vision";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: "saifoo" };
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
