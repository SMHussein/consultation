import Button from "../_components/Button";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";

export default function Overview() {
  return (
    <Section classes="bg-primary-200 text-white">
      <Row grid={3} classes="flex flex-col gap-6 items-start">
        <Heading>WELCOME TO STRATEGIC GEARS!</Heading>
        <div className="text-accent-50 flex flex-col gap-4">
          <p>
            Strategic Gears is a leading management consulting firm that
            provides multidisciplinary services for both the private and public
            sectors. The company was established in 2015 with offices in Riyadh
            and Jeddah. In 2019, we opened our first international office in
            London.
          </p>
          <p>
            Our proposition relies on our belief that value creation is the
            union of a sound “Strategic” direction and an organization “Geared”
            towards it. We work closely with our clients to set their visions,
            plan their operations, and support them practically throughout their
            journey. Hence, our name: Strategic Gears.
          </p>
        </div>
        <Button href="#" variation="secondary" className="bg-primary-150 ">
          Read More
        </Button>
      </Row>
    </Section>
  );
}
