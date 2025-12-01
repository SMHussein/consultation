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
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-primary-150">
            {t('welcome')} {user.user_metadata?.name || ''}
          </p>
          <h1 className="text-3xl font-semibold text-primary-200">
            {t('title')}
          </h1>
          <p className="text-base text-primary-170">{t('subtitle')}</p>
        </header>

        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {enriched.length === 0 ? (
            <div className="p-8 text-center text-primary-170">
              {t('noApplications')}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {enriched.map((application) => (
                <li key={application.id} className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-primary-200">
                        {application.jobTitle}
                      </p>
                      <p className="text-sm text-primary-170">
                        {application.jobLocation}
                        {application.jobType ? ` • ${application.jobType}` : ''}
                      </p>
                      <p className="text-xs text-primary-160">
                        {t('appliedOn')} {application.appliedOn}
                      </p>
                    </div>
                    <div className="text-right text-sm text-primary-160">
                      {application.company && (
                        <p>
                          {t('currentCompany')}: {application.company}
                        </p>
                      )}
                      {application.salary && (
                        <p>
                          {t('expectedSalary')}: {application.salary}
                        </p>
                      )}
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-4 text-sm text-primary-160 sm:grid-cols-2">
                    <div>
                      <dt className="font-medium text-primary-200">
                        {t('location')}
                      </dt>
                      <dd>{application.location}</dd>
                    </div>
                    {application.linkedin && (
                      <div>
                        <dt className="font-medium text-primary-200">
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
                    {application.phone && (
                      <div>
                        <dt className="font-medium text-primary-200">
                          {t('phone')}
                        </dt>
                        <dd>{application.phone}</dd>
                      </div>
                    )}
                    {application.extraInfo && (
                      <div className="sm:col-span-2">
                        <dt className="font-medium text-primary-200">
                          {t('extraInfo')}
                        </dt>
                        <dd>{application.extraInfo}</dd>
                      </div>
                    )}
                    {application.cv && (
                      <div className="sm:col-span-2">
                        <dt className="font-medium text-primary-200">
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
                  </dl>
                  <ApplicationActions
                    application={application}
                    locale={locale}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
