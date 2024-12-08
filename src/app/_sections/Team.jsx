import Button from "../_components/Button";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import TeamMember from "../_components/TeamMember";
import { useTranslations } from "next-intl";

export default function Team() {
  const t = useTranslations("team");

  return (
    <Section>
      <Row grid={2} classes="flex flex-col gap-12 items-center">
        <Heading type="secondary">{t("title")}</Heading>
        <div className="flex justify-around items-center gap-16 w-full flex-wrap">
          <TeamMember
            name={t("yazan.name")}
            position={t("yazan.position")}
            imageUrl={t("yazan.src")}
          />
          <TeamMember
            name={t("naser.name")}
            position={t("naser.position")}
            imageUrl={t("naser.src")}
          />
          <TeamMember
            name={t("ahmad.name")}
            position={t("ahmad.position")}
            imageUrl={t("ahmad.src")}
          />
        </div>
        <Button href="/team">{t("btnText")}</Button>
      </Row>
    </Section>
  );
}
