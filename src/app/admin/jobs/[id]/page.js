import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import SuspenseComponent from '@/src/app/_components/SuspenseCopmonent';
import AdminApplicants from '@/src/app/_sections/AdminApplicants';
import { Suspense } from 'react';

export default async function JobApplicants({ params }) {
  const { id } = await params;

  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary" classes="mb-8">
          Applicants
        </Heading>
        <SuspenseComponent element={<AdminApplicants id={id} />} />
      </Row>
    </Section>
  );
}
