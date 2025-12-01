'use server';

import { createClient } from '../_utils/supabase/server';

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userObj = user
    ? {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata || {},
        role: user.app_metadata?.role || 'user',
        avatar:
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          user.user_metadata?.avatarUrl ||
          null,
      }
    : null;

  return userObj;
}
