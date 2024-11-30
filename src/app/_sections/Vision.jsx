import Card from "../_components/Card";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { BsClipboard2Check, BsBarChart } from "react-icons/bs";

export default function Vision() {
  const t = useTranslations("CompanyData");

  return (
    <Section>
      <Row
        grid={3}
        classes="border-t grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12"
      >
        <Card
          title={t("vision.title")}
          text={t("vision.text")}
          icon={<BsBarChart size={20} />}
        />
        <Card
          title={t("mission.title")}
          text={t("mission.text")}
          icon={<BsClipboard2Check size={20} />}
        />
      </Row>
    </Section>
  );
}
