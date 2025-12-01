'use server';
import { createClient } from '../_utils/supabase/server';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { jobIds } from '../_utils/jobs';

// await new Promise((resolve) => setTimeout(resolve, 5000));

function sanitizeRedirectPath(path) {
  if (typeof path !== 'string') return '/';
  if (!path.startsWith('/')) return '/';
  return path;
}

export async function newsLetterSubsribe(currentState, formData) {
  const t = await getTranslations('responses');
  const supabase = await createClient();
  const email = formData.get('email');
  const name = formData.get('name');

  if (!name || !email) {
    return {
      error: t('error.fields'),
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      error: t('error.email'),
    };
  }

  const { data: existing, error: existingError } = await supabase
    .from('news')
    .select('*')
    .eq('email', email);

  if (existing.length) {
    return {
      error: t('error.alreadySubscribed'),
    };
  }

  const { data, error } = await supabase
    .from('news')
    .insert([{ name, email }])
    .select();

  if (error) {
    return {
      error: t('error.generic'),
    };
  }

  return {
    success: t('success.subscribe'),
  };
}

export async function sendMessage(currentState, formData) {
  const t = await getTranslations('responses');
  const supabase = await createClient();
  const email = formData.get('email');
  const name = formData.get('name');
  const phone = formData.get('phone');
  const message = formData.get('message');
  const origin = 'ecmc';

  if (!name || !email || !phone || !message) {
    return {
      error: t('error.fields'),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      error: t('error.email'),
    };
  }

  const { data: existing, error: existingError } = await supabase
    .from('messages')
    .select('*')
    .eq('email', email);

  console.log('Existing messages:', existing);

  if (existing.length > 2) {
    return {
      error: t('error.manyMasseges'),
    };
  }

  const { data, error } = await supabase
    .from('messages')
    .insert([{ message, phone, name, email, origin }])
    .select();

  if (error) {
    return {
      error: t('error.generic'),
    };
  }

  return {
    success: t('success.contact'),
  };
}

async function verifyRecaptcha(token) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    // If secret key is not set, skip verification (for development)
    return true;
  }

  if (!token || token.trim() === '') {
    return false;
  }

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    // For reCAPTCHA v2, we only check data.success
    // For v3, we would also check data.score >= 0.5
    // Since we're using v2 now, just check success
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function jobApply(currentState, formData) {
  const t = await getTranslations('responses');
  const supabase = await createClient();

  // Get logged-in user
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return {
      error: t('error.unauthorized') || 'You must be logged in to apply',
    };
  }

  // Use authenticated user's email directly (email field removed from form)
  const email = authUser.email?.toLowerCase().trim();
  if (!email) {
    return {
      error: t('error.email') || 'Email is required',
    };
  }

  const name = formData.get('name');
  const phone = formData.get('phone');
  const location = formData.get('location');
  const company = formData.get('company');
  const linkedin = formData.get('linkedin');
  const nationality = formData.get('nationality');
  const university = formData.get('university');
  const arabic = formData.get('arabic');
  const english = formData.get('english');
  const salary = formData.get('salary');
  const extraInfo = formData.get('extraInfo');
  const cv = formData.get('cv');
  const job = formData.get('job');
  const recaptchaToken = formData.get('recaptchaToken');
  const storageUrl = process.env.SUPABASE_STORAGE_URL;
  const cvName = `${Math.random()}-${cv?.name}`.replaceAll(' ', '-');
  const cvPath = `${storageUrl}/${cvName}`;
  const jobId = jobIds[job];


  // Verify reCAPTCHA if enabled
  if (process.env.RECAPTCHA_SECRET_KEY) {
    if (!recaptchaToken) {
      return {
        error:
          t('error.captcha') || 'Please complete the security verification',
      };
    }

    const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return {
        error:
          t('error.captchaInvalid') ||
          'Security verification failed. Please try again.',
      };
    }
  }

  if (!jobId) {
    return {
      error: t('error.job'),
    };
  }
  if (cv?.size > 1000000) {
    return {
      error: t('error.size'),
    };
  }

  console.log(name, phone, cv, location, linkedin, nationality, university, arabic, english, salary);

  if (
    !name ||
    !phone ||
    !cv ||
    !location ||
    !linkedin ||
    !nationality ||
    !university ||
    !arabic ||
    !english ||
    !salary
  ) {
    return {
      error: t('error.fields'),
    };
  }

  const { data: existing, error: existingError } = await supabase
    .from('applicants')
    .select('*')
    .eq('email', email)
    .eq('job_id', jobId);

  if (existing.length) {
    return {
      error: t('error.applied'),
    };
  }

  const { count, error: countError } = await supabase
    .from('applicants')
    .select('*', { count: 'exact', head: true })
    .eq('email', email);

  if (count >= 2) {
    return {
      error: t('error.appliedTwoJobs'),
    };
  }

  const { data, error } = await supabase
    .from('applicants')
    .insert([
      {
        name,
        email,
        phone,
        location,
        company,
        linkedin,
        nationality,
        university,
        arabic,
        english,
        salary,
        extraInfo,
        cv: cvPath,
        job_id: jobId,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    return {
      error: t('error.generic'),
    };
  }

  const { error: storageError } = await supabase.storage
    .from('cvs')
    .upload(cvName, cv);

  if (storageError) {
    await supabase.from('applicants').delete().eq('id', data.at(0).id);
    throw new Error(`CV could not be uploaded - ${storageError.message}`);
  }

  return {
    success: t('success.apply'),
  };
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  redirect('/');
}

export async function authLogin(currentState, formData) {
  const t = await getTranslations('auth');
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = sanitizeRedirectPath(formData.get('redirectTo')) || '/';

  if (!email || !password) {
    return {
      error: t('error.fieldsRequired'),
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return {
      error: t('error.invalidCredentials'),
    };
  }

  redirect(redirectTo);
}

export async function authSignup(currentState, formData) {
  const t = await getTranslations('auth');
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const redirectTo = sanitizeRedirectPath(formData.get('redirectTo')) || '/';

  if (!email || !password) {
    return {
      error: t('error.fieldsRequired'),
    };
  }

  if (password.length < 6) {
    return {
      error: t('error.passwordTooShort'),
    };
  }

  if (password !== confirmPassword) {
    return {
      error: t('error.passwordsDontMatch'),
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log(error);
    return {
      error: t('error.signupFailed'),
    };
  }

  if (data?.session) {
    redirect(redirectTo);
  }

  return {
    success: t('success.emailConfirmation'),
  };
}

export async function authGoogle(next) {
  const t = await getTranslations('auth');
  const supabase = await createClient();
  const redirectUrl = next !== '/' ? `?next=${next}` : '';

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback${redirectUrl}`;

  console.log(url);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: url,
    },
  });

  if (error) {
    console.log(error);
    return {
      error: t('error.googleSignInFailed'),
    };
  }

  if (data?.url) {
    console.log(data.url);
    redirect(data.url);
  }

  return {
    error: t('error.googleRedirectFailed'),
  };
}

export async function login(currentState, formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    return {
      error: 'Username or password are invalid',
    };
  }

  redirect('/admin');
}

export async function archiveApplicant(currentState, formData) {
  const id = formData.get('id');

  const supabase = await createClient();

  // Get the applicant data first
  const { data: applicant, error: fetchError } = await supabase
    .from('applicants')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError) {
    return {
      error: 'Failed to fetch applicant',
    };
  }

  // Insert into archive table
  const { error: archiveError } = await supabase
    .from('archive')
    .insert([{ ...applicant }]);

  if (archiveError) {
    return {
      error: 'Failed to archive applicant',
    };
  }

  // Delete from applicants table
  const { error: deleteError } = await supabase
    .from('applicants')
    .delete()
    .eq('id', id);

  if (deleteError) {
    return {
      error: 'Failed to delete applicant',
    };
  }

  return {
    success: 'Applicant archived successfully',
  };
}

export async function deleteMessage(currentState, formData) {
  const id = formData.get('id');
  
  if (!id) {
    return {
      error: 'Message ID is required',
    };
  }

  const supabase = await createClient();

  // Try to delete and get the deleted record
  const { error, data } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error('Delete message error:', error);
    return {
      error: `Failed to delete message: ${error.message}`,
    };
  }

  // If no data returned, the record might not exist or was already deleted
  if (!data || data.length === 0) {
    // Still return success if the record doesn't exist (idempotent delete)
    return {
      success: 'Message deleted successfully',
    };
  }

  return {
    success: 'Message deleted successfully',
  };
}

export async function deleteSubscriber(currentState, formData) {
  const id = formData.get('id');
  
  if (!id) {
    return {
      error: 'Subscriber ID is required',
    };
  }

  const supabase = await createClient();

  // Try to delete and get the deleted record
  const { error, data } = await supabase
    .from('news')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    console.error('Delete subscriber error:', error);
    return {
      error: `Failed to delete subscriber: ${error.message}`,
    };
  }

  // If no data returned, the record might not exist or was already deleted
  if (!data || data.length === 0) {
    // Still return success if the record doesn't exist (idempotent delete)
    return {
      success: 'Subscriber deleted successfully',
    };
  }

  return {
    success: 'Subscriber deleted successfully',
  };
}

export async function updateJson(currentState, formData) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = process.env.REPO_OWNER;
  const REPO_NAME = process.env.REPO_NAME;
  const EN_FILE_PATH = process.env.EN_FILE_PATH;
  const AR_FILE_PATH = process.env.AR_FILE_PATH;
  const BRANCH = process.env.BRANCH;

  const { enMessages, arMessages } = formData;

  try {
    const isReady = await checkVercelDeployment();

    if (!isReady) {
      return {
        error: 'Please give it a few minutes until the build is ready!',
      };
    }

    const repoApiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

    // 1️⃣ Fetch latest commit and tree SHA
    const branchRes = await fetch(`${repoApiUrl}/git/ref/heads/${BRANCH}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });

    if (!branchRes.ok) return { error: 'Failed to fetch branch details' };

    const branchData = await branchRes.json();
    const latestCommitSha = branchData.object.sha;

    const commitRes = await fetch(
      `${repoApiUrl}/git/commits/${latestCommitSha}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    if (!commitRes.ok) return { error: 'Failed to fetch commit details' };

    const commitDataJson = await commitRes.json();
    const treeSha = commitDataJson.tree.sha;

    // 2️⃣ Fetch the existing files
    const enFileUrl = `${repoApiUrl}/contents/${EN_FILE_PATH}`;
    const arFileUrl = `${repoApiUrl}/contents/${AR_FILE_PATH}`;

    const [enRes, arRes] = await Promise.all([
      fetch(enFileUrl, { headers: { Authorization: `token ${GITHUB_TOKEN}` } }),
      fetch(arFileUrl, { headers: { Authorization: `token ${GITHUB_TOKEN}` } }),
    ]);

    if (!enRes.ok || !arRes.ok)
      return { error: 'Failed to fetch file contents' };

    const enFileData = await enRes.json();
    const arFileData = await arRes.json();

    const enOldContent = Buffer.from(enFileData.content, 'base64').toString(
      'utf-8'
    );
    const arOldContent = Buffer.from(arFileData.content, 'base64').toString(
      'utf-8'
    );

    // Parse the existing English content into an object
    const enOldJson = JSON.parse(enOldContent);
    const arOldJson = JSON.parse(arOldContent);

    // Merge the existing data with the new messages
    const updatedContentEn = JSON.stringify(
      { ...enOldJson, ...enMessages },
      null,
      2
    );
    const updatedContentAr = JSON.stringify(
      { ...arOldJson, ...arMessages },
      null,
      2
    );

    // 3️⃣ Create new blobs for the updated files
    const [enBlobRes, arBlobRes] = await Promise.all([
      fetch(`${repoApiUrl}/git/blobs`, {
        method: 'POST',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContentEn, encoding: 'utf-8' }),
      }),
      fetch(`${repoApiUrl}/git/blobs`, {
        method: 'POST',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: updatedContentAr, encoding: 'utf-8' }),
      }),
    ]);

    if (!enBlobRes.ok || !arBlobRes.ok)
      return { error: 'Failed to create blobs' };

    const enBlobData = await enBlobRes.json();
    const arBlobData = await arBlobRes.json();

    // 4️⃣ Create a new tree with the updated files
    const treeRes = await fetch(`${repoApiUrl}/git/trees`, {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base_tree: treeSha,
        tree: [
          {
            path: EN_FILE_PATH,
            mode: '100644',
            type: 'blob',
            sha: enBlobData.sha,
          },
          {
            path: AR_FILE_PATH,
            mode: '100644',
            type: 'blob',
            sha: arBlobData.sha,
          },
        ],
      }),
    });

    if (!treeRes.ok) return { error: 'Failed to create new tree' };

    const treeDataJson = await treeRes.json();

    // 🚨 5️⃣ Check if the tree is unchanged
    if (treeDataJson.sha === treeSha) {
      return { error: 'Nothing changed. Skipping update.' };
    }

    // 6️⃣ Create a new commit referencing the new tree
    const newCommitRes = await fetch(`${repoApiUrl}/git/commits`, {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Admin dashboard, updating stats',
        tree: treeDataJson.sha,
        parents: [latestCommitSha],
      }),
    });

    if (!newCommitRes.ok) return { error: 'Failed to create commit' };

    const newCommitData = await newCommitRes.json();

    // 7️⃣ Update the branch reference to point to the new commit
    const updateBranchRes = await fetch(
      `${repoApiUrl}/git/refs/heads/${BRANCH}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sha: newCommitData.sha }),
      }
    );

    if (!updateBranchRes.ok) return { error: 'Failed to update branch' };

    return {
      success:
        'Stats updated successfully! Please give it a couple of minutes to see the change.',
    };
  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred' };
  }
}

export async function checkVercelDeployment() {
  const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
  const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

  try {
    let url = `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=1`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
    });

    if (!response.ok) throw new Error('Cannot fetch project status!');

    const data = await response.json();

    if (data.deployments.length === 0) return { error: 'No deployments found' };

    const latestDeployment = data.deployments[0];
    const status = latestDeployment.state; // "BUILDING", "READY", "ERROR", etc.

    if (status === 'BUILDING') {
      return false;
    }

    if (status === 'READY') {
      return true;
    }
  } catch (error) {
    return { error: error };
  }
}
