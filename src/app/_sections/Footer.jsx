import Link from "next/link";
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

const linkWrapperClass =
  "flex flex-col gap-2 border-t-[0.5px] pt-8 md:pt-0 md:ps-8 border-gray-500/50 md:border-l-[0.5px] md:border-t-0";

export default function Footer() {
  return (
    <footer className="bg-accent-150 border-t">
      <Row grid={3}>
        <div className="flex justify-around flex-col md:flex-row gap-8">
          <div>
            <Logo />
          </div>
          <div className={linkWrapperClass}>
            <FooterLink href="/home" label="Home" icon={<BiHomeSmile />} />
            <FooterLink href="/about" label="About Us" icon={<BiGlobe />} />
            <FooterLink
              href="/services"
              label="Services"
              icon={<BiSolidColor />}
            />
          </div>
          <div className={linkWrapperClass}>
            <FooterLink
              href="/publications"
              label="Publications"
              icon={<BiLayer />}
            />
            <FooterLink
              href="/careers"
              label="Careers"
              icon={<BiShoppingBag />}
            />
            <FooterLink href="/contact" label="Contact Us" icon={<BiPhone />} />
          </div>
        </div>
        <div className="flex justify-between items-center md:justify-around mt-8 pt-8 border-t-[0.5px] border-gray-500/50">
          <div className="flex items-center gap-4">
            <FooterLink href="/facebook" icon={<BiLogoFacebook size={20} />} />
            <FooterLink href="/linkedin" icon={<BsTwitterX size={18} />} />
            <FooterLink href="/twitter" icon={<BiLogoLinkedin size={20} />} />
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
