'use client';
import { useEffect, useRef, useState } from 'react';
import { Link, usePathname } from '@/src/i18n/routing';
import { HiBars4, HiXMark } from 'react-icons/hi2';
import Logo from '../_components/Logo';
import { useTranslations } from 'next-intl';
import { logout } from '@/src/app/_api/serverFunctions';
import { useFormStatus } from 'react-dom';

const Header = ({ locale, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname(); // Get the current path
  const dropdownRef = useRef(null);
  const t = useTranslations('header');

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClick(event) {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setProfileOpen(false);
  }, [pathname]);

  const profileLink = `/profile`;
  const loginLink = `/auth/login`;
  const avatarSrc =
    user?.avatar ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    user?.user_metadata?.avatarUrl ||
    null;

  // Get user initials for display
  const getUserInitials = () => {
    if (!user) return '';

    // Try to get name from user_metadata first
    const fullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.user_metadata?.display_name;

    if (fullName) {
      const names = fullName.trim().split(/\s+/);
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
      }
      return names[0][0].toUpperCase();
    }

    // Fallback to email initials
    if (user.email) {
      const emailPart = user.email.split('@')[0];
      if (emailPart.length >= 2) {
        return emailPart.substring(0, 2).toUpperCase();
      }
      return emailPart[0].toUpperCase();
    }

    return 'U';
  };

  const userInitials = getUserInitials();

  return (
    <header className="sticky top-0 left-0 w-full bg-accent-150 dark:bg-primary-210 shadow-md z-50 text-primary-170 dark:text-accent-50 ">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            <ul className="hidden md:flex items-center gap-8">
              <GeneratHeaderLinks />
            </ul>
            <div className="hidden md:flex items-center gap-4">
              <Link href={pathname} locale={locale === 'ar' ? 'en' : 'ar'}>
                {locale === 'ar' ? 'English' : 'عربي'}
              </Link>
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className=" text-primary-200 hover:bg-white hover:text-primary-160 focus:outline-none"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    aria-label="Account menu"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                  >
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt="Account avatar"
                        className="h-10 w-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary-160 text-white inline-flex items-center justify-center text-sm border-2 border-primary-170">
                        {userInitials}
                      </div>
                    )}
                  </button>
                  {profileOpen && (
                    <div
                      className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-2 text-sm text-primary-200 shadow-lg ring-1 ring-black/5"
                      role="menu"
                    >
                      <Link
                        href={profileLink}
                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setProfileOpen(false)}
                        role="menuitem"
                      >
                        {t('myAccount')}
                      </Link>
                      <form action={logout}>
                        <LogoutButton />
                      </form>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={loginLink}
                  className="text-primary-200 dark:text-white hover:text-primary-160 dark:hover:text-accent-200 transition-colors duration-200 font-medium text-sm"
                >
                  {t('login')}
                </Link>
              )}
            </div>
            <button
              className="md:hidden flex items-center text-primary-170"
              onClick={isOpen ? closeMenu : openMenu}
              aria-label="Toggle Menu"
            >
              <HiBars4 size={28} />
            </button>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-40 transition-all ${
            isOpen
              ? 'opacity-100 visible translate-x-0'
              : 'opacity-0 invisible -translate-x-full'
          }`}
          onClick={closeMenu}
        >
          <div
            className={`bg-white h-full w-full max-w-sm ${
              locale === 'ar' ? 'left-0' : 'right-0'
            } shadow-xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Logo />
                <button
                  onClick={closeMenu}
                  aria-label="Close Menu"
                  className="text-primary-170 hover:text-primary-160 transition-colors p-2"
                >
                  <HiXMark size={24} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <div className="flex flex-col gap-1">
                  <GeneratHeaderLinks onClick={closeMenu} />
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <Link
                      href={pathname}
                      locale={locale === 'ar' ? 'en' : 'ar'}
                      onClick={closeMenu}
                      className="block py-2.5 px-3 text-primary-200 hover:text-primary-160 transition-colors text-sm font-medium"
                    >
                      {locale === 'ar' ? 'English' : 'عربي'}
                    </Link>
                  </div>
                  {user ? (
                    <div className="pt-4 mt-4 border-t border-gray-100 space-y-2">
                      <Link
                        href={profileLink}
                        onClick={closeMenu}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors group"
                      >
                        {avatarSrc ? (
                          <img
                            src={avatarSrc}
                            alt="Account avatar"
                            className="h-9 w-9 rounded-full object-cover flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-primary-160 text-white inline-flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {userInitials}
                          </div>
                        )}
                        <span className="font-medium text-primary-200 group-hover:text-primary-160 transition-colors">
                          {t('myAccount')}
                        </span>
                      </Link>
                      <form action={logout} className="w-full">
                        <LogoutButton mobile />
                      </form>
                    </div>
                  ) : (
                    <div className="pt-4 mt-4 border-t border-gray-100">
                      <Link
                        href={loginLink}
                        onClick={closeMenu}
                        className="block py-2.5 px-3 text-primary-200 hover:text-primary-160 transition-colors text-sm font-medium"
                      >
                        {t('login')}
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

function GeneratHeaderLinks({ onClick }) {
  const links = [
    'home',
    'services',
    'about',
    'contact',
    'publications',
    'careers',
  ];
  return links.map((link, i) => (
    <HeaderLink key={i} item={link} onClick={onClick} />
  ));
}

function LogoutButton({ mobile = false }) {
  const { pending } = useFormStatus();
  const t = useTranslations('header');

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${
        mobile
          ? 'w-full px-3 py-2.5 rounded-md text-red-600 hover:bg-red-50 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-start gap-2'
          : 'flex w-full px-4 py-2 text-left hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
      }`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {t('loggingOut')}
        </span>
      ) : (
        t('logout')
      )}
    </button>
  );
}

function HeaderLink({ item, onClick = () => {} }) {
  const t = useTranslations('navigation');

  const pathname = usePathname(); // Get the current path
  const href = item === 'home' ? '/' : `/${item}`;
  const label = t(`${item}`);
  const isActive = pathname === href;

  return (
    <Link
      onClick={() => onClick()}
      href={href}
      className={`block py-2.5 px-3 rounded-md transition-colors text-sm font-medium ${
        isActive
          ? 'text-primary-160 bg-primary-160/10'
          : 'text-primary-200 hover:text-primary-160 hover:bg-gray-50'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}
