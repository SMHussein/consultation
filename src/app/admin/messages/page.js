import Heading from '@/src/app/_components/Heading';
import Row from '@/src/app/_components/Row';
import Section from '@/src/app/_components/Section';
import SuspenseComponent from '../../_components/SuspenseCopmonent';
import AdminMessages from '../../_components/AdminMessages';

export default function Messages() {
  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Messages</Heading>
        <SuspenseComponent element={<AdminMessages />} />
      </Row>
    </Section>
  );
}
