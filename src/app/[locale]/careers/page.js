import { setRequestLocale } from "next-intl/server";
import SectionHero from "../../_sections/SectionHero";
import CareersIntro from "../../_sections/CareersIntro";
import CareersNeeds from "../../_sections/CareersNeeds";

export default async function Careers({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SectionHero service="hero" section="careers" />
      <CareersIntro />
      <CareersNeeds />
    </main>
  );
}
