import { getTranslations, setRequestLocale } from "next-intl/server";
import SectionHero from "@/src/app/_sections/SectionHero";
import PublicationsHeading from "../../_sections/Publications";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("publications"),
  };
}

export default async function Publications({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SectionHero service="hero" section="publications" />
      <PublicationsHeading />
    </main>
  );
}
