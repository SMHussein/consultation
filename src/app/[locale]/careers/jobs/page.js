import Card from "@/src/app/_components/Card";
import Heading from "@/src/app/_components/Heading";
import Row from "@/src/app/_components/Row";
import Section from "@/src/app/_components/Section";
import JobsList from "@/src/app/_sections/JobsList";

export default function Jobs() {
  return (
    <main>
      <Section>
        <Row grid={1}>
          <Heading type="primary">Select your major and apply!</Heading>
          <JobsList />
        </Row>
      </Section>
    </main>
  );
}
