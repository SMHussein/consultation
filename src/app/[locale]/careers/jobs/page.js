import JobsList from "@/src/app/_sections/JobsList";
import { canonicalLocale } from "@/src/app/_utils/helpers";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("currentCareers"),
    description: t("careers.description"),
    alternates: {
      canonical: `https://www.ecmc-ksa.com${canonicalLocale(
        locale
      )}/careers/jobs`,
    },
  };
}

export default async function Jobs({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JobsList />
    </main>
  );
}
