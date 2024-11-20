import { BiGroup } from "react-icons/bi";
import Button from "../_components/Button";
import Heading from "../_components/Heading";
import Section from "../_components/Section";
import TeamMember from "../_components/TeamMember";
import Row from "../_components/Row";

const team = [
  { name: "HATTAN SAATY", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "NASSER ALQAHTANI", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "NAJIB ALHURAIBI", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "ABDULLAH ALBARQAWI", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "Ahmed Essam", position: "CEO", src: "/test.jpg", href: "#" },
];

export default function Team() {
  return (
    <Section>
      <Row grid={4} classes="flex flex-col gap-6">
        <Heading classes="text-primary-100 text-center">
          STRATEGIC GEARS LEADERS
        </Heading>
        <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-12 justify-items-center">
          {team.map((member) => (
            <TeamMember member={member} />
          ))}
        </ul>
        <Button
          href="/team"
          className="self-center"
          customIcon={<BiGroup size={20} />}
        >
          Management Team
        </Button>
      </Row>
    </Section>
  );
}
