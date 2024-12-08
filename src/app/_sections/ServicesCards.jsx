import Card from "../_components/Card";
import {
  BsBarChartSteps,
  BsFillPhoneVibrateFill,
  BsBuildings,
} from "react-icons/bs";

import { useTranslations } from "next-intl";

export default function ServicesCards() {
  const t = useTranslations("OurServices");
  return (
    <>
      <Card
        title={t("strategies.title")}
        text={t("strategies.subTitle")}
        icon={<BsBarChartSteps size={20} />}
        href={`/services/${t("strategies.href")}`}
      />
      <Card
        title={t("organizationalExcellency.title")}
        text={t("organizationalExcellency.subTitle")}
        icon={<BsBuildings size={20} />}
        href={`/services/${t("organizationalExcellency.href")}`}
      />
      <Card
        title={t("marketing.title")}
        text={t("marketing.subTitle")}
        icon={<BsFillPhoneVibrateFill size={20} />}
        href={`/services/${t("marketing.href")}`}
      />
    </>
  );
}
