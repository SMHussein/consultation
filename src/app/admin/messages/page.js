import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import AdminMessages from '../../_components/AdminMessages';
import { getMessages } from '@/src/app/_api/adminServices';

export default async function Messages() {
  const messages = await getMessages();

  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Messages</Heading>
        <AdminMessages initialMessages={messages || []} />
      </Row>
    </Section>
  );
}
