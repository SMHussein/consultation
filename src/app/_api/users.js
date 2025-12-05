'use server';

import { jobSlugById } from '../_utils/jobs';
import { getTranslations } from 'next-intl/server';
import { createClient } from '../_utils/supabase/server';
import { revalidatePath } from 'next/cache';

const editableFields = [
  'name',
  'phone',
  'location',
  'company',
  'salary',
  'linkedin',
  'extraInfo',
];

const sanitizeText = (value) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

const profilePath = (locale) => (locale ? `/${locale}/profile` : `/profile`);

/**
 * Enriches raw applicant rows with translated job metadata and formatted labels.
 * Shared helper so other user-facing features can reuse the same logic.
 */
export async function enrichApplicationsWithJobMeta(
  applications = [],
  locale,
  profileTranslations
) {
  if (!applications.length) return [];

  const t =
    profileTranslations ||
    (await getTranslations({ locale, namespace: 'profile' }));
  const jobTranslations = await getTranslations({
    locale,
    namespace: 'jobs',
  });

  return Promise.all(
    applications.map(async (application) => {
      const slug = jobSlugById[application.job_id];
      let title = t('roleRemoved');
      let jobLocation = application.location;
      let jobType = null;

      if (slug) {
        try {
          title = jobTranslations(`${slug}.title`) || t('roleRemoved');
          jobLocation =
            jobTranslations(`${slug}.location`) || application.location;
          jobType = jobTranslations(`${slug}.type`) || null;
        } catch {
          // Translation not found, use defaults
        }
      }

      return {
        ...application,
        jobTitle: title,
        jobLocation,
        jobType,
      };
    })
  );
}

export async function updateApplicationAction(formData) {
  const applicationId = formData.get('applicationId');
  const locale = formData.get('locale');

  if (!applicationId) {
    return { error: 'updateError' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: 'notAuthenticated' };
  }

  const updates = {};
  editableFields.forEach((field) => {
    if (formData.has(field)) {
      updates[field] = sanitizeText(formData.get(field));
    }
  });

  if (!Object.keys(updates).length) {
    return { error: 'updateError' };
  }

  const { error } = await supabase
    .from('applicants')
    .update(updates)
    .eq('id', applicationId)
    .eq('email', user.email);

  if (error) {
    console.error(error);
    return { error: 'updateError' };
  }

  revalidatePath(profilePath(locale));
  return { ok: true };
}

export async function withdrawApplicationAction(formData) {
  const applicationId = formData.get('applicationId');
  const locale = formData.get('locale');

  if (!applicationId) {
    return { error: 'withdrawError' };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { error: 'notAuthenticated' };
  }

  // First, fetch the applicant data to get the CV path BEFORE deleting
  const { data: applicantData, error: fetchError } = await supabase
    .from('applicants')
    .select('cv')
    .eq('id', applicationId)
    .eq('email', user.email)
    .single();

  if (fetchError || !applicantData) {
    console.error('Error fetching applicant:', fetchError);
    return { error: 'withdrawError' };
  }

  let cvFileName = null;
  if (applicantData.cv) {
    try {
      const cvPath = applicantData.cv;
      console.log('CV path from database:', cvPath);

      if (cvPath.includes('/cvs/')) {
        const parts = cvPath.split('/cvs/');
        if (parts.length > 1) {
          cvFileName = parts[1];
        }
      }

      if (!cvFileName && cvPath.includes('/')) {
        cvFileName = cvPath.split('/').pop();
      }

      if (!cvFileName) {
        cvFileName = cvPath;
      }

      if (cvFileName) {
        cvFileName = cvFileName.split('?')[0].split('#')[0].trim();
      }

      console.log('Extracted CV filename:', cvFileName);
    } catch (error) {
      console.error('Error parsing CV path:', error, cvPath);
    }
  }

  if (cvFileName) {
    try {
      const { data: deleteData, error: storageError } = await supabase.storage
        .from('cvs')
        .remove([cvFileName]);
    } catch (error) {
      console.error('Exception while deleting CV from storage:', error);
      console.error('CV filename:', cvFileName);
      // Continue with applicant deletion even if storage deletion fails
    }
  } else {
    console.warn('No CV filename extracted from path:', applicantData.cv);
    console.warn('Skipping storage deletion');
  }

  const { error: deleteError } = await supabase
    .from('applicants')
    .delete()
    .eq('id', applicationId)
    .eq('email', user.email);

  if (deleteError) {
    console.error('Error deleting applicant:', deleteError);
    return { error: 'withdrawError' };
  }

  revalidatePath(profilePath(locale));
  return { ok: true };
}
