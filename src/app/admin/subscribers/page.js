import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import AdminSubscribers from '@/src/app/_sections/AdminSubscribers';

export default async function Dashboard() {
  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Subscribers</Heading>
        <AdminSubscribers />
      </Row>
    </Section>
  );
}
