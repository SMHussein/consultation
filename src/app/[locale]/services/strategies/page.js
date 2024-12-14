import SectionDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.strategies"),
  };
}

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
