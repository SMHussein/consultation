import { Link } from "@/src/i18n/routing";
import Logo from "../_components/Logo";
import Row from "../_components/Row";
import {
  BiHomeSmile,
  BiGlobe,
  BiShoppingBag,
  BiPhone,
  BiSolidColor,
  BiLayer,
  BiLogoFacebook,
  BiLogoLinkedin,
} from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import ScrollToTopButton from "../_components/ScrollButton";
import { useTranslations } from "next-intl";

const linkWrapperClass =
  "flex flex-col gap-2 border-t-[0.5px] pt-8 md:pt-0 md:ps-8 border-gray-500/50 md:border-s-[0.5px] md:border-t-0";

export default function Footer() {
  const t = useTranslations("navigation");

  return (
    <footer className="bg-accent-150 border-t">
      <Row grid={3}>
        <div className="flex justify-around flex-col md:flex-row gap-8">
          <div>
            <Logo />
          </div>
          <div className={linkWrapperClass}>
            <FooterLink href="/" label={t("home")} icon={<BiHomeSmile />} />
            <FooterLink href="/about" label={t("about")} icon={<BiGlobe />} />
            <FooterLink
              href="/services"
              label={t("services")}
              icon={<BiSolidColor />}
            />
          </div>
          <div className={linkWrapperClass}>
            <FooterLink
              href="/publications"
              label={t("publications")}
              icon={<BiLayer />}
            />
            <FooterLink
              href="/careers"
              label={t("careers")}
              icon={<BiShoppingBag />}
            />
            <FooterLink
              href="/contact"
              label={t("contact")}
              icon={<BiPhone />}
            />
          </div>
        </div>
        <div className="flex justify-between items-center md:justify-around mt-8 pt-8 border-t-[0.5px] border-gray-500/50">
          <div className="flex items-center gap-4">
            <FooterLink
              href="https://www.linkedin.com/company/ecmc-ksa"
              icon={<BiLogoLinkedin size={20} />}
            />
          </div>
          <div>
            <ScrollToTopButton />
          </div>
        </div>
      </Row>
    </footer>
  );
}

function FooterLink({ href, label, icon }) {
  return (
    <Link
      href={href}
      className="text-sm font-thin flex items-center gap-2 hover:text-primary-170"
    >
      {icon}
      {label}
    </Link>
  );
}
