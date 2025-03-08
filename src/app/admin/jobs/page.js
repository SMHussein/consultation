import { getJobs } from '@/src/app/_api/services';
import AdminJobCard from '@/src/app/_components/AdminJobCard';
import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';

export default async function Jobs() {
  const { jobs, applicants } = await getJobs();
  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Job Applications</Heading>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs?.map((job) => {
            const jobApplicants = applicants?.filter(
              (applicant) => applicant['job_id'] === job.id
            );
            const applicantCount = jobApplicants?.length || 0;
            return (
              <AdminJobCard
                key={job.id}
                title={job.name}
                text={`${job.type} / ${job.location}`}
                href={`/admin/jobs/${job.id}`}
                applicantCount={applicantCount}
              />
            );
          })}
        </div>
      </Row>
    </Section>
  );
}
