import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import AdminSubscribers from '@/src/app/_sections/AdminSubscribers';
import { getNewsletterEmails } from '@/src/app/_api/adminServices';

export default async function Dashboard() {
  const subscribers = await getNewsletterEmails();

  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Subscribers</Heading>
        <AdminSubscribers initialSubscribers={subscribers || []} />
      </Row>
    </Section>
  );
}
