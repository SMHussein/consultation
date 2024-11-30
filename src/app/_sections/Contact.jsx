import Form from "../_components/Form";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";

export default function Contact() {
  return (
    <Section>
      <Row grid={2}>
        <Heading type="secondary" classes="mb-6 text-center">
          Subscribe to our publications
        </Heading>
        <Form />
      </Row>
    </Section>
  );
}
