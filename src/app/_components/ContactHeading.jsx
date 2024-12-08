import { useTranslations } from "next-intl";
import Heading from "./Heading";

export default function ContactHeading() {
  const t = useTranslations("contact");

  return (
    <Heading type="secondary" classes="text-center py-2 mb-12">
      {t("hero.subtitle")}
    </Heading>
  );
}
