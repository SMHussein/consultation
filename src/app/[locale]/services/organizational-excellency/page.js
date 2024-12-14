import ServiceDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.organizationalExcellency"),
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ServiceHero service="organizationalExcellency" section="OurServices" />
      <ServiceDesc service="organizationalExcellency" section="OurServices" />
    </main>
  );
}
