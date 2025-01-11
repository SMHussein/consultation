import ServiceDesc from "@/src/app/_sections/SectionDesc";
import ServiceHero from "@/src/app/_sections/SectionHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { canonicalLocale } from "@/src/app/_utils/helpers";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("services.organizationalExcellency"),
    description: t("services.description"),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(
        locale
      )}/services/organizational-excellency`,
    },
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
