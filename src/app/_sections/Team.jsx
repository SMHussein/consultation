import { BiGroup } from "react-icons/bi";
import Button from "../_components/Button";
import Heading from "../_components/Heading";
import Section from "../_components/Section";
import TeamMember from "../_components/TeamMember";
import Row from "../_components/Row";
import { useTranslations } from "next-intl";

const team = [
  { name: "Yazan Al-Salman", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "Yazan Al-Salman", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "Yazan Al-Salman", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "Yazan Al-Salman", position: "CEO", src: "/test.jpg", href: "#" },
  { name: "Yazan Al-Salman", position: "CEO", src: "/test.jpg", href: "#" },
];

export default function Team() {
  const t = useTranslations("team");

  return (
    <Section>
      <Row grid={3} classes="flex flex-col gap-6">
        <Heading classes="text-primary-100 text-center">{t("title")}</Heading>
        <ul className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-12 justify-items-center">
          {team.map((member, i) => (
            <TeamMember member={member} key={i} />
          ))}
        </ul>
        <Button
          href="/team"
          className="self-center"
          icon={<BiGroup size={20} />}
        >
          {t("btnText")}
        </Button>
      </Row>
    </Section>
  );
}
