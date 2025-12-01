import { notFound } from 'next/navigation';
import { getApplicantById } from '@/src/app/_api/services';
import ApplicantDetailView from '@/src/app/_sections/ApplicantDetailView';
import Link from 'next/link';
import { HiArrowLeft } from 'react-icons/hi2';

export default async function ApplicantDetailPage({ params }) {
  const { id, applicantId } = await params;

  let applicant;
  try {
    applicant = await getApplicantById(applicantId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link
        href={`/admin/jobs/${id}`}
        className="inline-flex items-center gap-2 text-primary-150 hover:text-primary-160 mb-6 transition-colors"
      >
        <HiArrowLeft size={20} />
        <span>Back to Applicants</span>
      </Link>
      <ApplicantDetailView applicant={applicant} jobId={id} isArchive={false} />
    </div>
  );
}

