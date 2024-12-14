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
      <Row grid={2} classes="flex flex-col gap-12 text-center sm:text-justify">
        <Heading type="primary">{t("titles.main")}</Heading>
        <div className="flex flex-col gap-6 border-b py-4">
          <Heading>{t("titles.consultancy")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("associate-consultant.title")}
              text={t("associate-consultant.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("associate-consultant.href")}
              type="tertiary"
            />
            <Card
              title={t("manager.title")}
              text={t("manager.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("manager.href")}
              type="tertiary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-b py-4">
          <Heading>{t("titles.marketingAndCommunication")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("marketing-specialist.title")}
              text={t("marketing-specialist.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("marketing-specialist.href")}
              type="tertiary"
            />
            <Card
              title={t("market-research-associate.title")}
              text={t("market-research-associate.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("market-research-associate.href")}
              type="tertiary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 border-b py-4">
          <Heading>{t("titles.accountingAndFinance")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("finance-manager.title")}
              text={t("finance-manager.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("finance-manager.href")}
              type="tertiary"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 border-b py-4">
          <Heading>{t("titles.administration")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("office-administrator.title")}
              text={t("office-administrator.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("office-administrator.href")}
              type="tertiary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-b py-4">
          <Heading>{t("titles.businessDevelopment")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("partnership-specialist.title")}
              text={t("partnership-specialist.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("partnership-specialist.href")}
              type="tertiary"
            />
            <Card
              title={t("senior-advisory-operations-specialist.title")}
              text={t("senior-advisory-operations-specialist.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("senior-advisory-operations-specialist.href")}
              type="tertiary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-b py-4">
          <Heading>{t("titles.humanResource")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("hr.title")}
              text={t("hr.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("hr.href")}
              type="tertiary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 py-4">
          <Heading>{t("titles.informationTechnology")}</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              title={t("it.title")}
              text={t("it.type")}
              icon={
                <BsFillBriefcaseFill size={25} className="text-primary-150" />
              }
              href={t("it.href")}
              type="tertiary"
            />
          </div>
        </div>
      </Row>
    </Section>
  );
}
