'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  updateApplicationAction,
  withdrawApplicationAction,
} from '../_api/users';

export default function ApplicationActions({ application, locale }) {
  const t = useTranslations('profile');
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, startSavingTransition] = useTransition();
  const [isWithdrawing, startWithdrawTransition] = useTransition();

  const cloneFormData = (formData) => {
    const cloned = new FormData();
    for (const [key, value] of formData.entries()) {
      cloned.append(key, value);
    }
    return cloned;
  };

  const handleUpdate = (formData) => {
    const payload = cloneFormData(formData);

    startSavingTransition(() => {
      updateApplicationAction(payload)
        .then((result) => {
          if (result?.error) {
            toast.error(t(`actions.${result.error}`));
            return;
          }
          toast.success(t('actions.updateSuccess'));
          setIsEditing(false);
          router.refresh();
        })
        .catch(() => toast.error(t('actions.updateError')));
    });
  };

  const handleWithdraw = () => {
    if (!window.confirm(t('actions.confirmWithdraw'))) return;
    const payload = new FormData();
    payload.append('applicationId', application.id);
    payload.append('locale', locale);

    startWithdrawTransition(() => {
      withdrawApplicationAction(payload)
        .then((result) => {
          if (result?.error) {
            toast.error(t(`actions.${result.error}`));
            return;
          }
          toast.success(t('actions.withdrawSuccess'));
          router.refresh();
        })
        .catch(() => toast.error(t('actions.withdrawError')));
    });
  };

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="rounded-md border border-primary-100 px-4 py-2 text-sm font-medium text-primary-150 transition hover:bg-primary-50 disabled:opacity-60"
          disabled={isSaving || isWithdrawing}
        >
          {isEditing ? t('actions.cancelEdit') : t('actions.edit')}
        </button>
        <button
          type="button"
          onClick={handleWithdraw}
          className="rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60"
          disabled={isSaving || isWithdrawing}
        >
          {isWithdrawing ? t('actions.withdrawing') : t('actions.withdraw')}
        </button>
      </div>

      {isEditing && (
        <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="text-sm text-primary-160">{t('actions.editIntro')}</p>

          <form
            action={handleUpdate}
            className="mt-4 grid gap-4 text-sm sm:grid-cols-2"
          >
            <input type="hidden" name="applicationId" value={application.id} />
            <input type="hidden" name="locale" value={locale} />

            <FormField
              label={t('fields.fullName')}
              name="name"
              defaultValue={application.name || ''}
              idSuffix={application.id}
            />
            <FormField
              label={t('fields.phone')}
              name="phone"
              defaultValue={application.phone || ''}
              idSuffix={application.id}
            />
            <FormField
              label={t('fields.location')}
              name="location"
              defaultValue={application.location || ''}
              idSuffix={application.id}
            />
            <FormField
              label={t('fields.company')}
              name="company"
              defaultValue={application.company || ''}
              idSuffix={application.id}
            />
            <FormField
              label={t('fields.salary')}
              name="salary"
              defaultValue={application.salary || ''}
              idSuffix={application.id}
            />
            <FormField
              label={t('fields.linkedin')}
              name="linkedin"
              defaultValue={application.linkedin || ''}
              idSuffix={application.id}
            />
            <div className="sm:col-span-2">
              <label
                className="mb-1 block text-primary-160"
                htmlFor={`extraInfo-${application.id}`}
              >
                {t('fields.extraInfo')}
              </label>
              <textarea
                id={`extraInfo-${application.id}`}
                name="extraInfo"
                className="w-full rounded-md border border-gray-200 px-3 py-2"
                rows={4}
                defaultValue={application.extraInfo || ''}
              />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-primary-150 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-160 disabled:opacity-60"
                disabled={isSaving}
              >
                {isSaving ? t('actions.saving') : t('actions.save')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function FormField({ label, name, defaultValue, idSuffix }) {
  const inputId = `${name}-${idSuffix}`;
  return (
    <div>
      <label className="mb-1 block text-primary-160" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        className="w-full rounded-md border border-gray-200 px-3 py-2"
        type="text"
        defaultValue={defaultValue}
      />
    </div>
  );
}

