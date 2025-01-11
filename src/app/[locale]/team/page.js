import TeamDetails from "@/src/app/_components/TeamDetails";
import SectionHero from "@/src/app/_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { canonicalLocale } from "@/src/app/_utils/helpers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("team"),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(locale)}/team`,
    },
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
