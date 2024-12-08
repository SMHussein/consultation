import Card from "../_components/Card";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { BsCardChecklist } from "react-icons/bs";

export default function JobsList() {
  const t = useTranslations("jobs");

  return (
    <Section>
      <Row grid={2} classes="flex gap-4 flex-wrap">
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />{" "}
        <Card
          title={t("associateConsultant.title")}
          text={t("associateConsultant.type")}
          icon={<BsCardChecklist size={30} className="text-primary-150" />}
          href={t("associateConsultant.href")}
        />
      </Row>
    </Section>
  );
}
