import JobApply from "@/src/app/_sections/Apply";
import { setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
  const jobs = [
    { name: "marketingSpecialist" },
    { name: "associateConsultant" },
  ];

  const jobNames = jobs.map((job) => {
    return {
      jobName: job.name,
    };
  });

  return jobNames;
}

export default async function Apply({ params }) {
  const { locale, jobName } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JobApply job={jobName} />
    </main>
  );
}
