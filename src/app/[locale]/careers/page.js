import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionHero from "../../_sections/SectionHero";
import CareersIntro from "../../_sections/CareersIntro";
import CareersNeeds from "../../_sections/CareersNeeds";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("careers"),
  };
}

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
