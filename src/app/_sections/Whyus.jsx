import Heading from "../_components/Heading";
import Section from "../_components/Section";
import Row from "../_components/Row";

import {
  HiGlobeAlt,
  HiMiniCog8Tooth,
  HiBuildingOffice2,
  HiOutlineTrophy,
} from "react-icons/hi2";

import { useTranslations } from "next-intl";

import Card from "../_components/Card";

export default function WhyUs() {
  const t = useTranslations("Whyus");

  return (
    <Section>
      <Row grid={2} classes="flex flex-col items-center gap-8 ">
        <Heading type="secondary">{t("title")}</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          <Card
            type="tertiary"
            title={t("expertise.title")}
            text={t("expertise.text")}
            icon={<HiGlobeAlt size={30} className="text-primary-150" />}
          />
          <Card
            type="tertiary"
            title={t("knowledge.title")}
            text={t("knowledge.text")}
            icon={<HiMiniCog8Tooth size={30} className="text-primary-150" />}
          />
          <Card
            type="tertiary"
            title={t("strategy.title")}
            text={t("strategy.text")}
            icon={<HiBuildingOffice2 size={30} className="text-primary-150" />}
          />
          <Card
            type="tertiary"
            title={t("governance.title")}
            text={t("governance.text")}
            icon={<HiOutlineTrophy size={30} className="text-primary-150" />}
          />
        </div>
      </Row>
    </Section>
  );
}
