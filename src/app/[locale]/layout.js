import "../globals.css";
import localFont from "next/font/local";
import Header from "@/src/app/_sections/Header";
import Footer from "@/src/app/_sections/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import ToasterLayout from "../_components/Toaster";
import { getMetadata } from "../_utils/helpers";

const georgia = localFont({
  src: "../fonts/georgia.ttf",
  variable: "--font-georgia",
});
const bahij = localFont({
  src: "../fonts/Bahij.ttf",
  variable: "--font-bahij",
});

export async function generateMetadata({ params }) {
  const { locale } = params;
  return getMetadata(locale);
}

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
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body className={locale === "ar" ? bahij.className : georgia.className}>
        <ToasterLayout />
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
