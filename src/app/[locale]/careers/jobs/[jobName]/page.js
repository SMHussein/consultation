import JobDetails from "@/src/app/_sections/JobDetails";
import { setRequestLocale } from "next-intl/server";

export default async function JobDefaultPage({ params }) {
  const { locale, jobName } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JobDetails job={jobName} />
    </main>
  );
}
