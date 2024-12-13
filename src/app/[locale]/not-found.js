import Button from "@/src/app/_components/Button";
import Heading from "@/src/app/_components/Heading";
import Row from "@/src/app/_components/Row";
import Section from "@/src/app/_components/Section";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const b = useTranslations("Buttons");

  return (
    <Section>
      <Row
        grid={3}
        classes="flex flex-col gap-8 leading-relaxed h-[80dvh] items-center justify-center"
      >
        <Heading type="primary" classes="mb-12 text-center">
          {t("noPage")}
        </Heading>
        <Button href="/" className="self-center">
          {b("back")}
        </Button>
      </Row>
    </Section>
  );
}
