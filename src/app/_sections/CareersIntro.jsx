import Card from "../_components/Card";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { BsPersonArmsUp, BsRocketTakeoff, BsStars } from "react-icons/bs";

export default function CareersIntro() {
  const t = useTranslations("careers");

  return (
    <Section>
      <Row>
        <Heading classes="mb-8">{t("culture.heading")}</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          <Card
            title={t("culture.challenge.title")}
            text={t("culture.challenge.text")}
            type="tertiary"
            icon={<BsPersonArmsUp size={30} className="text-primary-150" />}
          />
          <Card
            title={t("culture.growth.title")}
            text={t("culture.growth.text")}
            type="tertiary"
            icon={<BsRocketTakeoff size={30} className="text-primary-150" />}
          />
          <Card
            title={t("culture.innovation.title")}
            text={t("culture.innovation.text")}
            type="tertiary"
            icon={<BsStars size={30} className="text-primary-150" />}
          />
        </div>
      </Row>
    </Section>
  );
}
