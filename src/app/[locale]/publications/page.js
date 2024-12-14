import { getTranslations, setRequestLocale } from "next-intl/server";

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

  return <main></main>;
}
