'use client';

import { Link, usePathname } from '@/src/i18n/routing';
import Logo from '../_components/Logo';
import Row from '../_components/Row';
import {
  BiHomeSmile,
  BiGlobe,
  BiShoppingBag,
  BiPhone,
  BiSolidColor,
  BiLayer,
  BiLogoLinkedin,
  BiMapPin,
} from 'react-icons/bi';
import ScrollToTopButton from '../_components/ScrollButton';
import { useTranslations } from 'next-intl';

const linkWrapperClass =
  'flex flex-col gap-2 border-t-[0.5px] pt-8 md:pt-0 md:ps-8 border-gray-500/50 md:border-s-[0.5px] md:border-t-0';

export default function Footer() {
  const t = useTranslations('navigation');

  return (
    <footer className="bg-accent-150 border-t text-primary-200 dark:text-accent-50 dark:bg-primary-210">
      <Row grid={3}>
        {/* === Top Section: Logo and Links === */}
        <div className="flex justify-around flex-col md:flex-row gap-8">
          <div>
            <Logo />
          </div>

          {/* First group of links */}
          <ul className={linkWrapperClass}>
            <FooterLink
              href="/"
              label={t('home')}
              icon={<BiHomeSmile aria-hidden="true" />}
            />
            <FooterLink
              href="/about"
              label={t('about')}
              icon={<BiGlobe aria-hidden="true" />}
            />
            <FooterLink
              href="/services"
              label={t('services')}
              icon={<BiSolidColor aria-hidden="true" />}
            />
          </ul>

          {/* Second group of links */}
          <ul className={linkWrapperClass}>
            <FooterLink
              href="/publications"
              label={t('publications')}
              icon={<BiLayer aria-hidden="true" />}
            />
            <FooterLink
              href="/careers"
              label={t('careers')}
              icon={<BiShoppingBag aria-hidden="true" />}
            />
            <FooterLink
              href="/contact"
              label={t('contact')}
              icon={<BiPhone aria-hidden="true" />}
            />
          </ul>
        </div>

        {/* === Bottom Section: Social Icons & Location === */}
        <div className="flex justify-between items-center md:justify-around mt-8 pt-8 border-t-[0.5px] border-gray-500/50">
          <ul className="flex items-center gap-6">
            <FooterLink
              href="https://www.linkedin.com/company/ecmc-ksa"
              icon={<BiLogoLinkedin aria-hidden="true" size={20} />}
              ariaLabel="LinkedIn"
            />

            <FooterLink
              href="https://maps.app.goo.gl/DGACHYp1bTqjo5Lc9?g_st=ipc"
              icon={<BiMapPin aria-hidden="true" size={20} />}
              label="Our Location"
            />
          </ul>

          <div>
            <ScrollToTopButton />
          </div>
        </div>
      </Row>
    </footer>
  );
}

/* === Footer Link Component === */
function FooterLink({ href, label, icon, ariaLabel }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive ? 'text-primary-160' : '';

  return (
    <li>
      <Link
        href={href}
        className={`text-sm font-thin flex items-center gap-2 hover:text-primary-170 ${activeClass}`}
        aria-label={ariaLabel}
        aria-current={isActive ? 'page' : undefined}
      >
        {icon}
        {label}
      </Link>
    </li>
  );
}
