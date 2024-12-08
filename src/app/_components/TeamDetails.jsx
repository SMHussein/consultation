import Image from "next/image";
import Row from "./Row";
import Section from "./Section";
import Heading from "./Heading";
import { useTranslations } from "next-intl";

export default function TeamDetails() {
  const t = useTranslations("team");

  return (
    <Section classes="bg-accent-150">
      <Row grid={2} classes="flex flex-col gap-16">
        <TeamItem
          name={t("naser.name")}
          src={t("naser.src")}
          text={t("naser.text")}
          position={t("naser.position")}
        />
        <TeamItem
          name={t("yazan.name")}
          src={t("yazan.src")}
          text={t("yazan.text")}
          position={t("yazan.position")}
        />
        <TeamItem
          name={t("ahmad.name")}
          src={t("ahmad.src")}
          text={t("ahmad.text")}
          position={t("ahmad.position")}
        />
      </Row>
    </Section>
  );
}

function TeamItem({ name, text, src, position }) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 border-b border-primary-150 p-6 shadow-md">
      <Image
        src={src}
        alt={name}
        width={200}
        height={200}
        className="rounded-md  border"
      />
      <div className="pt-2 flex flex-col gap-4">
        <Heading type="secondary" classes="flex flex-col gap-2">
          <span>{name}</span>
          <span className="text-sm text-primary-170">{position}</span>
        </Heading>
        <p>{text}</p>
      </div>
    </div>
  );
}
