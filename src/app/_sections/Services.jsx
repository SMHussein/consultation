import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import ServiceItem from "../_components/ServiceItem";
import { useTranslations } from "next-intl";
import { getItems } from "../_utils/helpers";

export default function Services() {
  const t = useTranslations("OurServices");
  const strategiesServices = getItems(t, "OurServices.strategies.items");
  const organizationalExcellencyrServices = getItems(
    t,
    "OurServices.organizationalExcellency.items"
  );
  const marketingServices = getItems(t, "OurServices.marketing.items");

  return (
    <Section classes="bg-accent-150">
      <Row grid={3}>
        <Heading classes="text-primary-100 text-center mb-6">
          {t("title")}
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          <ServiceItem
            service={strategiesServices}
            src={t("strategies.src")}
            title={t("strategies.title")}
          />
          <ServiceItem
            service={organizationalExcellencyrServices}
            src={t("organizationalExcellency.src")}
            title={t("organizationalExcellency.title")}
          />
          <ServiceItem
            service={marketingServices}
            src={t("marketing.src")}
            title={t("marketing.title")}
          />
        </div>
      </Row>
    </Section>
  );
}
