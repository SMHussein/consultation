'use client';

import { useActionState, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Button from '../_components/Button';
import { authGoogle, authLogin, authSignup } from '../_api/serverFunctions';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { useTranslations } from 'next-intl';

export default function Auth({ mode = 'login', locale }) {
  const t = useTranslations('auth');
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next');
  const [loading, setIsLoading] = useState(false);
  const redirectTo = nextParam && nextParam.startsWith('/') ? nextParam : `/`;
  const action = mode === 'signup' ? authSignup : authLogin;
  const [state, formAction] = useActionState(action, {});
  const content = {
    title: t(`${mode}.title`),
    subtitle: t(`${mode}.subtitle`),
    cta: t(`${mode}.cta`),
    switchText: t(`${mode}.switchText`),
    switchHref: mode === 'login' ? 'signup' : 'login',
    switchLabel: t(`${mode}.switchLabel`),
  };

  useEffect(() => {
    if (state?.error) toast.error(state.error);
    if (state?.success) toast.success(state.success);
  }, [state]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await authGoogle(redirectTo);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg space-y-8">
        <div className="flex justify-center">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={70}
              priority
            />
          </Link>
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            {content.title}
          </h1>
          <p className="text-gray-500">{content.subtitle}</p>
        </div>

        <form action={formAction} className="space-y-4" noValidate>
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-base outline-none focus:border-primary-150"
            type="email"
            name="email"
            placeholder={t('email')}
            required
            autoComplete="email"
          />
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-base outline-none focus:border-primary-150"
            type="password"
            name="password"
            placeholder={t('password')}
            required
            autoComplete={
              mode === 'login' ? 'current-password' : 'new-password'
            }
            minLength={6}
          />
          {mode === 'signup' && (
            <input
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-base outline-none focus:border-primary-150"
              type="password"
              name="confirmPassword"
              placeholder={t('confirmPassword')}
              required
              autoComplete="new-password"
              minLength={6}
            />
          )}
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <Button type="submit" className="w-full justify-center">
            {content.cta}
          </Button>
        </form>

        <div className="relative text-center text-sm text-gray-400">
          <span className="absolute inset-x-0 top-1/2 h-px w-full bg-gray-200"></span>
          <span className="relative inline-block bg-white px-3">
            {t('orContinueWith')}
          </span>
        </div>

        <button
          disabled={loading}
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-3 text-sm font-medium text-primary-170 transition hover:bg-gray-50"
        >
          <FcGoogle size={20} aria-hidden="true" />
          {loading ? t('signingIn') : t('google')}
        </button>

        <p className="text-center text-sm text-gray-600">
          {content.switchText}{' '}
          <Link
            className="font-semibold text-primary-150 hover:underline"
            href={`/${locale}/auth/${content.switchHref}${
              nextParam ? `?next=${encodeURIComponent(nextParam)}` : ''
            }`}
          >
            {content.switchLabel}
          </Link>
        </p>
      </div>
    </section>
  );
}
