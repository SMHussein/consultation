import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";

export default function Clients() {
  return (
    <Section>
      <Row grid={2}>
        <Heading classes="text-primary-100 text-center">Our Clients</Heading>
      </Row>
    </Section>
  );
}
