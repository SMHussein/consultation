import Heading from "@/src/app/_components/Heading";
import Row from "@/src/app/_components/Row";
import Section from "@/src/app/_components/Section";

export default async function Messages() {
  return (
    <Section>
      <Row grid={2}>
        <Heading type="primary">Messages</Heading>
      </Row>
    </Section>
  );
}
