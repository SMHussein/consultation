import Button from "../_components/Button";
import Card from "../_components/Card";
import Heading from "../_components/Heading";
import Row from "../_components/Row";
import Section from "../_components/Section";
import { useTranslations } from "next-intl";
import {
  BsBrightnessHigh,
  BsDatabaseAdd,
  BsCameraVideo,
  BsPersonBoundingBox,
} from "react-icons/bs";

export default function CareersNeeds() {
  const t = useTranslations("careers");

  return (
    <Section>
      <Row classes="flex flex-col gap-12">
        <Heading>{t("needs.heading")}</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12">
          <Card
            title={t("needs.character.title")}
            text={t("needs.character.text")}
            type="tertiary"
            icon={
              <BsPersonBoundingBox size={30} className="text-primary-150" />
            }
          />
          <Card
            title={t("needs.mindset.title")}
            text={t("needs.mindset.text")}
            type="tertiary"
            icon={<BsDatabaseAdd size={30} className="text-primary-150" />}
          />
          <Card
            title={t("needs.ambition.title")}
            text={t("needs.ambition.text")}
            type="tertiary"
            icon={<BsBrightnessHigh size={30} className="text-primary-150" />}
          />
          <Card
            title={t("needs.journey.title")}
            text={t("needs.journey.text")}
            type="tertiary"
            icon={<BsCameraVideo size={30} className="text-primary-150" />}
          />
        </div>

        <Button href="/careers/jobs" className="self-center">
          {t("btnText")}
        </Button>
      </Row>
    </Section>
  );
}
