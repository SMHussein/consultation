import { createClient } from '@/src/app/_utils/supabase/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { getSession } from '@/src/app/_api/session';
import { enrichApplicationsWithJobMeta } from '@/src/app/_api/users';
import ApplicationActions from '@/src/app/_components/ApplicationActions';

async function formatDate(value, locale, t) {
  if (!value) return t('pending');
  try {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default async function ProfilePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const user = await getSession();

  const profileUrl = `/${locale}/profile`;

  if (!user) {
    redirect(`/${locale}/auth/login?next=${encodeURIComponent(profileUrl)}`);
  }

  const supabase = await createClient();
  const { data: applications = [] } = await supabase
    .from('applicants')
    .select(
      'id,name,phone,job_id,location,company,salary,linkedin,cv,created_at,extraInfo'
    )
    .eq('email', user.email)
    .order('created_at', { ascending: false });

  const t = await getTranslations('profile');
  const applicationsWithJobs = await enrichApplicationsWithJobMeta(
    applications,
    locale,
    t
  );

  const enriched = await Promise.all(
    applicationsWithJobs.map(async (application) => ({
      ...application,
      appliedOn: await formatDate(application.created_at, locale, t),
    }))
  );

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4">
        <header className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-wide text-primary-150">
              {t('welcome')} {user.user_metadata?.name || ''}
            </p>
            <h1 className="text-3xl font-semibold text-primary-200">
              {t('title')}
            </h1>
            <p className="text-base text-primary-170">{t('subtitle')}</p>
          </div>
          {user.role === 'admin' && (
            <a
              href="/admin"
              className="rounded-md bg-primary-150 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary-160"
            >
              {t('adminPanel') || 'Admin Panel'}
            </a>
          )}
        </header>

        {enriched.length === 0 ? (
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-12 text-center text-primary-170">
            {t('noApplications')}
          </div>
        ) : (
          <div className="grid gap-6">
            {enriched.map((application) => (
              <div
                key={application.id}
                className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-semibold text-primary-200 mb-1">
                        {application.jobTitle}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-primary-170 mb-2">
                        <span>{application.jobLocation}</span>
                        {application.jobType && (
                          <>
                            <span className="text-primary-160">•</span>
                            <span>{application.jobType}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs text-primary-160">
                        {t('appliedOn')} {application.appliedOn}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid gap-4 text-sm sm:grid-cols-2">
                    {application.company && (
                      <div>
                        <dt className="font-medium text-primary-200 mb-1">
                          {t('currentCompany')}
                        </dt>
                        <dd className="text-primary-160">{application.company}</dd>
                      </div>
                    )}
                    {application.salary && (
                      <div>
                        <dt className="font-medium text-primary-200 mb-1">
                          {t('expectedSalary')}
                        </dt>
                        <dd className="text-primary-160">{application.salary}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="font-medium text-primary-200 mb-1">
                        {t('location')}
                      </dt>
                      <dd className="text-primary-160">{application.location}</dd>
                    </div>
                    {application.phone && (
                      <div>
                        <dt className="font-medium text-primary-200 mb-1">
                          {t('phone')}
                        </dt>
                        <dd className="text-primary-160">{application.phone}</dd>
                      </div>
                    )}
                    {application.linkedin && (
                      <div>
                        <dt className="font-medium text-primary-200 mb-1">
                          {t('linkedin')}
                        </dt>
                        <dd>
                          <a
                            href={application.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-150 hover:underline"
                          >
                            {t('viewProfile')}
                          </a>
                        </dd>
                      </div>
                    )}
                    {application.cv && (
                      <div>
                        <dt className="font-medium text-primary-200 mb-1">
                          {t('cv')}
                        </dt>
                        <dd>
                          <a
                            href={application.cv}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary-150 hover:underline"
                          >
                            {t('downloadCv')}
                          </a>
                        </dd>
                      </div>
                    )}
                  </div>
                  {application.extraInfo && (
                    <div className="pt-2 border-t border-gray-100">
                      <dt className="font-medium text-primary-200 mb-2 text-sm">
                        {t('extraInfo')}
                      </dt>
                      <dd className="text-primary-160 text-sm whitespace-pre-wrap">
                        {application.extraInfo}
                      </dd>
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6">
                  <ApplicationActions
                    application={application}
                    locale={locale}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
