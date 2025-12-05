import AdminJobCard from '@/src/app/_components/AdminJobCard';
import { getJobs } from '@/src/app/_api/adminServices';

export default async function AdminJobs({ archived = false }) {
  const { jobs, applicants, archivedApplicants } = await getJobs();
  const applicantsType = archived ? archivedApplicants : applicants;
  const url = archived ? 'archive' : 'jobs';

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {jobs?.map((job) => {
        const jobApplicants = applicantsType?.filter(
          (applicant) => applicant['job_id'] === job.id
        );
        const applicantCount = jobApplicants?.length || 0;
        return (
          <AdminJobCard
            key={job.id}
            title={job.name}
            text={`${job.type} / ${job.location}`}
            href={`/admin/${url}/${job.id}`}
            applicantCount={applicantCount}
          />
        );
      })}
    </div>
  );
}
