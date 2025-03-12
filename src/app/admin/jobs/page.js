import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import AdminJobs from '../../_sections/AdminJobs';

export default async function Jobs() {
  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Job Applications</Heading>
        <AdminJobs />
      </Row>
    </Section>
  );
}
