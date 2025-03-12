import { getApplicants } from '@/src/app/_api/services';
import ApplicantCard from '@/src/app/_components/ApplicantCard';

export default async function AdminApplicants({ id }) {
  const applicants = await getApplicants(id);
  return (
    <div className="grid grid-cols-1 gap-12">
      {!applicants.length ? (
        <p>No Applicats for this job yet!</p>
      ) : (
        applicants.map((item) => (
          <ApplicantCard applicant={item} key={item.id} />
        ))
      )}
    </div>
  );
}
