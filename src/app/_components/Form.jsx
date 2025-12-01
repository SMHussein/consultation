'use client';
import { toast } from 'react-hot-toast';
import Button from './Button';
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState, useRef, startTransition } from 'react';
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

  const recaptchaRef = useRef(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState(null);
  const recaptchaRenderedRef = useRef(false);

  useEffect(() => {
    // Load reCAPTCHA v2 script
    if (
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
      typeof window !== 'undefined' &&
      job // Only load for job apply forms
    ) {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        // Script exists, wait for it to load
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            setRecaptchaLoaded(true);
          });
        }
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          window.grecaptcha.ready(() => {
            setRecaptchaLoaded(true);
          });
        }
      };
      document.head.appendChild(script);
    }
  }, [job]);

  useEffect(() => {
    // Render reCAPTCHA widget when script is loaded
    if (
      recaptchaLoaded &&
      job &&
      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY &&
      recaptchaRef.current &&
      recaptchaWidgetId === null &&
      !recaptchaRenderedRef.current &&
      window.grecaptcha
    ) {
      // Mark as attempting to render to prevent double rendering
      recaptchaRenderedRef.current = true;

      try {
        const widgetId = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          size: 'normal',
        });
        setRecaptchaWidgetId(widgetId);
      } catch (error) {
        // If error says already rendered, the widget might exist from a previous render
        if (error.message && error.message.includes('already been rendered')) {
          // Try to find existing widget by checking the container
          // If we can't find it, clear and retry once
          const hasIframe = recaptchaRef.current.querySelector('iframe[src*="recaptcha"]');
          if (!hasIframe) {
            // Clear and retry
            recaptchaRef.current.innerHTML = '';
            try {
              const widgetId = window.grecaptcha.render(recaptchaRef.current, {
                sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                size: 'normal',
              });
              setRecaptchaWidgetId(widgetId);
            } catch (retryError) {
              console.error('Error re-rendering reCAPTCHA:', retryError);
              recaptchaRenderedRef.current = false; // Allow retry
            }
          } else {
            // Widget exists, just mark as rendered
            recaptchaRenderedRef.current = true;
          }
        } else {
          console.error('Error rendering reCAPTCHA:', error);
          recaptchaRenderedRef.current = false; // Allow retry on other errors
        }
      }
    }

    // Cleanup function
    return () => {
      if (recaptchaWidgetId !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, [recaptchaLoaded, job, recaptchaWidgetId]);

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error);
      setIsSubmitting(false);
      // Reset reCAPTCHA on error so user can try again
      if (job && window.grecaptcha && recaptchaWidgetId !== null) {
        window.grecaptcha.reset(recaptchaWidgetId);
      }
    }
    if (formState.success) {
      toast.success(formState.success);
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
      // Reset reCAPTCHA after successful submission
      if (job && window.grecaptcha && recaptchaWidgetId !== null) {
        window.grecaptcha.reset(recaptchaWidgetId);
      }
    }
  }, [formState, job, recaptchaWidgetId]);

  const getRecaptchaToken = () => {
    if (
      !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
      typeof window === 'undefined' ||
      !window.grecaptcha ||
      recaptchaWidgetId === null
    ) {
      return null;
    }

    try {
      const token = window.grecaptcha.getResponse(recaptchaWidgetId);
      return token || null;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // Client-side validation: Check reCAPTCHA if enabled
    if (job && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      const recaptchaToken = getRecaptchaToken();
      
      // Validate token exists and is not empty
      if (!recaptchaToken || recaptchaToken.trim() === '') {
        toast.error('Please complete the security verification (reCAPTCHA)');
        setIsSubmitting(false);
        return;
      }

      // Additional validation: token should be a valid format (starts with typical reCAPTCHA token pattern)
      if (recaptchaToken.length < 20) {
        toast.error('Invalid security verification. Please try again.');
        setIsSubmitting(false);
        // Reset captcha
        if (window.grecaptcha && recaptchaWidgetId !== null) {
          window.grecaptcha.reset(recaptchaWidgetId);
        }
        return;
      }
    }

    setIsSubmitting(true);

    // Get reCAPTCHA token for submission
    let recaptchaToken = null;
    if (job && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      recaptchaToken = getRecaptchaToken();
    }

    const formData = new FormData(e.target);
    if (recaptchaToken) {
      formData.append('recaptchaToken', recaptchaToken);
    }

    // Use startTransition to properly handle the async action
    startTransition(() => {
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
    });
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
      {job && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
        <div className="flex flex-col gap-2">
          <div ref={recaptchaRef} className="g-recaptcha"></div>
          {!recaptchaLoaded && (
            <p className="text-xs text-primary-160">
              Loading security verification...
            </p>
          )}
        </div>
      )}
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
    ...(readOnly && { readOnly: true }),
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
