import JobsList from "@/src/app/_sections/JobsList";
import { setRequestLocale } from "next-intl/server";

export default async function Jobs({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JobsList />
    </main>
  );
}
