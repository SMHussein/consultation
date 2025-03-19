import ApplicantCard from '@/src/app/_components/ApplicantCard';

export default async function AdminApplicants({
  id,
  archive,
  getApplicantsFn,
}) {
  const applicants = await getApplicantsFn(id);

  return (
    <div className="grid grid-cols-1 gap-12">
      {!applicants.length ? (
        <p>No Applicats for this job yet!</p>
      ) : (
        applicants.map((item) => (
          <ApplicantCard applicant={item} archive={archive} key={item.id} />
        ))
      )}
    </div>
  );
}
