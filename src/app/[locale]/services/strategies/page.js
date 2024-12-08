import SectionDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";
import { setRequestLocale } from "next-intl/server";

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServiceHero service="strategies" section="OurServices" />
      <SectionDesc service="strategies" section="OurServices" />
    </main>
  );
}
