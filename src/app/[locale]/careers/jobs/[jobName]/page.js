import JobDetails from "@/src/app/_sections/JobDetails";
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

export default async function JobDefaultPage({ params }) {
  const { locale, jobName } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <JobDetails job={jobName} />
    </main>
  );
}
