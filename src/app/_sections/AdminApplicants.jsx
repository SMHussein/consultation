import AdminApplicantsList from './AdminApplicantsList';

export default async function AdminApplicants({
  id,
  archive,
  getApplicantsFn,
}) {
  const applicants = await getApplicantsFn(id);

  return (
    <AdminApplicantsList
      applicants={applicants || []}
      jobId={id}
      isArchive={archive}
    />
  );
}
