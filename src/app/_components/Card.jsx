import Button from "./Button";
import Heading from "./Heading";
import { useTranslations } from "next-intl";

export default function Card({ title, text, icon, href, type = "secondary" }) {
  const t = useTranslations("Buttons");

  return (
    <div className="rounderd-sm shadow-md border p-6  flex flex-col gap-8">
      <Heading
        type={type}
        classes="flex items-center gap-6 justify-center text-center border-b py-2 "
      >
        {icon}
        {title}
      </Heading>
      <p>{text}</p>
      {href && (
        <Button href={href} type="secondary">
          {t("read")}
        </Button>
      )}
    </div>
  );
}
