import Button from "../_components/Button";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import Slider from "../_components/Slider";
import { useTranslations } from "next-intl";
import { BsPersonAdd } from "react-icons/bs";

const slides = Array.from(
  { length: 8 },
  (_, i) => `/clients/client-${i + 1}.png`
);

export default function Clients() {
  const t = useTranslations("clients");

  return (
    <Section classes="bg-accent-150">
      <Row grid={2} classes="flex flex-col gap-8">
        <Heading classes="text-primary-100 text-center">{t("title")}</Heading>
        <Slider slides={slides} />
        <Button
          href="/clients"
          type="secondary"
          className="self-center"
          icon={<BsPersonAdd size={20} />}
        >
          {t("title")}
        </Button>
      </Row>
    </Section>
  );
}
