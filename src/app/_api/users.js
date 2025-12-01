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

  const { data: applicantData, error } = await supabase
    .from('applicants')
    .delete()
    .eq('id', applicationId)
    .eq('email', user.email);

  if (error) {
    console.error(error);
    return { error: 'withdrawError' };
  }

  const fileUrl = applicantData.cvurl;
  const filePath = fileUrl.split('/object/public/cvs/')[1];

  const { data, error: storageError } = await supabase.storage
    .from('cvs')
    .remove([filePath]);

  if (storageError) {
    console.error('Failed to delete CV:', storageError);
  }

  revalidatePath(profilePath(locale));
  return { ok: true };
}
