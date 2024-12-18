import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import { getItems } from "../_utils/helpers";
import Heading from "../_components/Heading";

export default function Specs() {
  const t = useTranslations("CompanyData");
  const specs = getItems(t, "CompanyData.specs.items");
  return (
    <Section>
      <Row grid={3} classes="flex flex-col gap-6 border-t">
        <Heading>{t("specs.title")}</Heading>
        <ul className="flex flex-wrap gap-4">
          {specs.map((value, i) => (
            <li
              key={i}
              className="border px-4 py-2 rounded-full bg-accent-150 dark:bg-primary-210"
            >
              {value}
            </li>
          ))}
        </ul>
      </Row>
    </Section>
  );
}
