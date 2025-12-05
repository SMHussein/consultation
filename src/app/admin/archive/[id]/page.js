import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import AdminApplicants from '@/src/app/_sections/AdminApplicants';
import { getArchivedApplicants } from '@/src/app/_api/adminServices';

export default async function JobApplicants({ params }) {
  const { id } = await params;

  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary" classes="mb-8">
          Applicants
        </Heading>
        <AdminApplicants
          id={id}
          archive={true}
          getApplicantsFn={getArchivedApplicants}
        />
      </Row>
    </Section>
  );
}
