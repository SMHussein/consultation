import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";

export default function PublicationsHeading() {
  const t = useTranslations("publications");

  return (
    <Section classes="p-0 md:p-12">
      <Row grid={2}>
        <Heading classes="text-center">{t("subTitle")}</Heading>
      </Row>
    </Section>
  );
}
