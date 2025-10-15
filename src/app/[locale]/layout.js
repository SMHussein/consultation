import '@/src/app/globals.css';
import localFont from 'next/font/local';
import Header from '@/src/app/_sections/Header';
import Footer from '@/src/app/_sections/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import ToasterLayout from '@/src/app/_components/Toaster';
import { getMetadata } from '@/src/app/_utils/helpers';
import { GoogleTagManager } from '@next/third-parties/google';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return getMetadata(locale);
}

const georgia = localFont({
  src: '../fonts/georgia.ttf',
  variable: '--font-georgia',
});
const bahij = localFont({
  src: '../fonts//Bahij.ttf',
  variable: '--font-bahij',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <GoogleTagManager gtmId="GTM-K738482T" />
      <body className={locale === 'ar' ? bahij.className : georgia.className}>
        <ToasterLayout />
        <NextIntlClientProvider messages={messages}>
          <a className="skip-link" href="#main-content" class="skip-link">
            Skip to main content
          </a>
          <Header locale={locale} />
          <main className="min-h-svh relative" id="main-content">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
