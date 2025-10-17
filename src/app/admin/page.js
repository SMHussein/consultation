import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import AdminDashboardForm from '@/src/app/_sections/AdminDashboardForm';

export default async function Dashboard() {
  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Dashboard</Heading>
        <AdminDashboardForm />
      </Row>
    </Section>
  );
}
