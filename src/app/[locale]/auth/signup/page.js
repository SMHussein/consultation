import Auth from '@/src/app/_sections/Auth';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getSession } from '@/src/app/_api/session';

export default async function SignupPage({ params, searchParams }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const user = await getSession();

  const nextPath = searchParams?.next;
  const fallback = `/${locale}`;
  const destination =
    typeof nextPath === 'string' && nextPath.startsWith('/')
      ? nextPath
      : fallback;

  if (user) {
    redirect(destination);
  }

  return <Auth mode="signup" locale={locale} />;
}
