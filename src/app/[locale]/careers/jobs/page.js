import JobsList from "@/src/app/_sections/JobsList";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("currentCareers"),
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
