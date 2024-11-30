import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { getItems } from "../_utils/helpers";
import Heading from "../_components/Heading";

export default function Values() {
  const t = useTranslations("CompanyData");
  const values = getItems(t, "CompanyData.values.items");
  return (
    <Section>
      <Row grid={3} classes="flex flex-col gap-6 border-t">
        <Heading>{t("values.title")}</Heading>
        <ul className="flex flex-wrap gap-4">
          {values.map((value, i) => (
            <li key={i} className="border px-4 py-2 rounded-full bg-accent-150">
              {value}
            </li>
          ))}
        </ul>
      </Row>
    </Section>
  );
}
