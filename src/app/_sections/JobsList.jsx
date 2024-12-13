import Card from "../_components/Card";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { BsFillBriefcaseFill } from "react-icons/bs";

export default function JobsList() {
  const t = useTranslations("jobs");

  return (
    <Section>
      <Row grid={2} classes="flex flex-col gap-8">
        <Heading type="primary">{t("titles.main")}</Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card
            title={t("associateConsultant.title")}
            text={t("associateConsultant.type")}
            icon={
              <BsFillBriefcaseFill size={25} className="text-primary-150" />
            }
            href={t("associateConsultant.href")}
          />
          <Card
            title={t("marketingSpecialist.title")}
            text={t("marketingSpecialist.type")}
            icon={
              <BsFillBriefcaseFill size={25} className="text-primary-150" />
            }
            href={t("marketingSpecialist.href")}
          />
        </div>
      </Row>
    </Section>
  );
}
