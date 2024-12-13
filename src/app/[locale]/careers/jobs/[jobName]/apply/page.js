import JobApply from "@/src/app/_sections/Apply";
import { setRequestLocale } from "next-intl/server";

export default async function Apply({ params }) {
  const { locale, jobName } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JobApply job={jobName} />
    </main>
  );
}
