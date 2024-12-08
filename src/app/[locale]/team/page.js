import TeamDetails from "../../_components/TeamDetails";
import SectionHero from "../../_sections/SectionHero";
import { setRequestLocale } from "next-intl/server";

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
