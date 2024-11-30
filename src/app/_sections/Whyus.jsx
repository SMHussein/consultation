import Image from "next/image";
import Heading from "../_components/Heading";
import Section from "../_components/Section";
import Row from "../_components/Row";
import { useTranslations } from "next-intl";

import {
  HiGlobeAlt,
  HiMiniCog8Tooth,
  HiBuildingOffice2,
  HiOutlineTrophy,
} from "react-icons/hi2";

import WhyusItem from "../_components/WhyusItem";

export default function WhyUs() {
  const t = useTranslations("Whyus");

  return (
    <Section classes="bg-accent-150">
      <Row grid={2} classes="flex flex-col items-center gap-8 text-center">
        <Heading type="secondary">{t("title")}</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          <WhyusItem
            title={t("expertise.title")}
            text={t("expertise.text")}
            icon={<HiGlobeAlt size={60} />}
          />
          <WhyusItem
            title={t("knowledge.title")}
            text={t("knowledge.text")}
            icon={<HiMiniCog8Tooth size={60} />}
          />
          <WhyusItem
            title={t("strategy.title")}
            text={t("strategy.text")}
            icon={<HiBuildingOffice2 size={60} />}
          />
          <WhyusItem
            title={t("governance.title")}
            text={t("governance.text")}
            icon={<HiOutlineTrophy size={60} />}
          />
        </div>
      </Row>
    </Section>
  );
}
