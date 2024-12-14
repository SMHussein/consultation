import TeamDetails from "../../_components/TeamDetails";
import SectionHero from "../../_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("team"),
  };
}

export default async function TeamPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <SectionHero service="page" section="team" />
      <TeamDetails />
    </main>
  );
}
