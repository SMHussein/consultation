import { createClient } from '@/src/app/_utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next');
  const origin = requestUrl.origin;
  const redirectTo = next ? next : 'en/profile';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(`${origin}/en/auth/login?error=auth_failed`);
    }
  } else {
    console.error('No code parameter found in callback');
    return NextResponse.redirect(`${origin}/en/auth/login?error=no_code`);
  }
  // URL to redirect to after sign in process completes
  // Using default locale 'en' since profile is under [locale]
  console.log(redirectTo);
  return NextResponse.redirect(`${origin}/${redirectTo}`);
}
