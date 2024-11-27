import Image from "next/image";
import Heading from "../_components/Heading";
import Section from "../_components/Section";
import Row from "../_components/Row";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <Section classes="relative">
      <Image src="/hero.jpg" fill className="object-cover -z-10" alt="" />
      <Row classes="flex items-center justify-center  min-h-[50dvh]">
        <div className="absolute inset-0 bg-black/50 -z-10"></div>
        <Heading type="primary" classes="text-white text-balance max-w-[50rem]">
          {t("title")}
        </Heading>
      </Row>
    </Section>
  );
}
