import CircularStat from "../_components/CircularStat";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <Section isLight={false}>
      <Row grid={3} classes="flex flex-col gap-8 justify-center items-center">
        <Heading type="secondary">{t("title")}</Heading>
        <p>{t("subtitle")}</p>
        <div className="flex flex-wrap gap-x-32 gap-y-8 justify-center">
          <CircularStat label={t("years.title")} value={t("years.number")} />
          <CircularStat
            label={t("sectors.title")}
            value={t("sectors.number")}
          />
          <CircularStat
            label={t("nationalities.title")}
            value={t("nationalities.number")}
          />
          <CircularStat
            label={t("clients.title")}
            value={t("clients.number")}
          />
          <CircularStat
            label={t("projects.title")}
            value={t("projects.number")}
          />
        </div>
      </Row>
    </Section>
  );
}
