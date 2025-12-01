'use client';
import { toast } from 'react-hot-toast';
import Button from './Button';
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState, useRef } from 'react';
import RadioInput from './RadioInput';

export default function Form({
  inputs,
  action,
  shouldMail = false,
  job,
  defaultValues = {},
  readOnlyFields = [],
}) {
  const t = useTranslations('Buttons');
  const [formState, formAction] = useActionState(action, {});
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (name, email, message, phone) => {
    try {
      const emailParams = {
        name,
        phone,
        email,
        message,
      };

      if (!name || !phone || !email || !message) return;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        emailParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Failed to send message. Please try again later.', error);
    }
  };

  useEffect(() => {
    // Load reCAPTCHA script
    if (
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
      typeof window !== 'undefined'
    ) {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error);
      setIsSubmitting(false);
    }
    if (formState.success) {
      toast.success(formState.success);
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [formState]);

  const executeRecaptcha = async () => {
    if (
      !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
      typeof window === 'undefined' ||
      !window.grecaptcha
    ) {
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: 'job_apply' }
      );
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    // Execute reCAPTCHA if enabled
    let recaptchaToken = null;
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      // Wait for grecaptcha to be available
      let attempts = 0;
      while (typeof window === 'undefined' || !window.grecaptcha) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
        if (attempts > 50) break; // 5 second timeout
      }

      recaptchaToken = await executeRecaptcha();
      if (!recaptchaToken) {
        toast.error('Please complete the security verification');
        setIsSubmitting(false);
        return;
      }
    }

    const formData = new FormData(e.target);
    if (recaptchaToken) {
      formData.append('recaptchaToken', recaptchaToken);
    }

    if (shouldMail) {
      const email = formData.get('email');
      const name = formData.get('name');
      const phone = formData.get('phone');
      const message = formData.get('message');
      formAction(formData);
      sendEmail(name, email, message, phone);
    } else {
      formAction(formData);
    }
  };

  const submitAction = (data) => {
    const email = data.get('email');
    const name = data.get('name');
    const phone = data.get('phone');
    const message = data.get('message');

    formAction(data);
    sendEmail(name, email, message, phone);
  };

  return (
    <form
      ref={formRef}
      onSubmit={job ? handleSubmit : undefined}
      action={!job ? (shouldMail ? submitAction : formAction) : undefined}
      className="text-primary-200 dark:text-white flex flex-col gap-6 w-full border shadow-sm p-4 rounded-md"
    >
      {inputs.map((input, i) => (
        <FormItem
          {...input}
          key={`input-${i}`}
          defaultValue={defaultValues[input.id]}
          readOnly={readOnlyFields.includes(input.id)}
        />
      ))}
      <input type="hidden" name="job" value={job} />
      <Button
        variation="secondary"
        type="submit"
        className="self-start bg-primary-150"
        disabled={isSubmitting}
      >
        {t('submit')}
      </Button>
      {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <p className="text-xs text-primary-160">
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Terms of Service
          </a>{' '}
          apply.
        </p>
      )}
    </form>
  );
}

function FormItem({
  id,
  type,
  required,
  accept,
  autocomplete,
  defaultValue,
  readOnly,
}) {
  const t = useTranslations('Form');
  const attributes = {
    className: `p-2 border border-accent-50 ${
      readOnly ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed' : ''
    }`,
    id,
    type,
    name: id,
    required,
    placeholder: t.has(`placeholder.${id}`) ? t(`placeholder.${id}`) : '',
    accept,
    autoComplete: autocomplete || 'off',
    ...(defaultValue !== undefined && { defaultValue }),
    ...(readOnly && { readOnly: true, disabled: true }),
  };
  const dynamicLabel = t(`${id}`);

  let element;
  switch (id) {
    case 'message':
    case 'extraInfo':
      element = <textarea rows={10} {...attributes} />;
      break;
    case 'arabic':
      return (
        <RadioInput
          label={dynamicLabel}
          items={[
            { id: 'basic', name: t('language.basic') },
            { id: 'intermediate', name: t('language.medium') },
            { id: 'advanced', name: t('language.advanced') },
          ]}
          groupName={id}
        />
      );
    case 'english':
      return (
        <RadioInput
          label={dynamicLabel}
          items={[
            { id: 'basic', name: t('language.basic') },
            { id: 'intermediate', name: t('language.medium') },
            { id: 'advanced', name: t('language.advanced') },
          ]}
          groupName={id}
        />
      );

    default:
      element = <input {...attributes} />;
      break;
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        {dynamicLabel}{' '}
        {required && (
          <>
            <span className="text-red-700" aria-hidden="true">
              *
            </span>
            <span className="sr-only">required</span>
          </>
        )}
      </label>
      {element}
    </div>
  );
}
