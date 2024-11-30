import SectionDesc from "../../_sections/SectionDesc";
import SectionHero from "../../_sections/SectionHero";
import Specs from "../../_sections/Specs";
import Values from "../../_sections/Values";
import Vision from "../../_sections/Vision";

export default function About() {
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
