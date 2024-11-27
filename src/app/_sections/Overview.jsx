import Button from "../_components/Button";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";

export default function Overview({ locale }) {
  const t = useTranslations("Overview");

  return (
    <Section classes="bg-primary-200 text-white">
      <Row grid={3} classes="flex flex-col gap-6 items-start text-accent-50">
        <Heading isLight={true}>{t("title")}</Heading>
        <div className="flex flex-col gap-4">
          <p>{t("textFirst")}</p>
          <p>{t("textSecond")}</p>
        </div>
        <Button href="#" variation="secondary" locale={locale}>
          {t("btnText")}
        </Button>
      </Row>
    </Section>
  );
}
