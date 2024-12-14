import JobApply from "@/src/app/_sections/Apply";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale, jobName } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const j = await getTranslations({ locale, namespace: "jobs" });

  const jobTitle = j(`${jobName}.title`);

  return {
    title: `${t("apply")}${jobTitle}`,
  };
}

export async function generateStaticParams() {
  const jobs = [
    { name: "marketing-specialist" },
    { name: "associate-consultant" },
    { name: "manager" },
    { name: "market-research-associate" },
    { name: "finance-manager" },
    { name: "office-administrator" },
    { name: "hr" },
    { name: "it" },
    { name: "partnership-specialist" },
    { name: "senior-advisory-operations-specialist" },
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
