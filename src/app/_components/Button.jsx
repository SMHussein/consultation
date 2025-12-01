'use client';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { Link } from '@/src/i18n/routing';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import SpinnerMini from './SpinnerMini';

function Button({
  href,
  type,
  icon,
  children,
  className,
  onClick,
  rel,
  araiaLabel,
  variant = 'default',
  showIcon = true,
}) {
  const pathname = usePathname();
  const { pending } = useFormStatus();

  // Base classes for different variants
  const variantClasses = {
    default: `text-white bg-primary-150 rounded-sm shadow-md bg-accent-100 hover:bg-primary-160 inline-flex gap-2 items-center justify-center transition-all min-w-[150px] inline-block py-2 px-4 disabled:opacity-70 disabled:cursor-not-allowed`,
    subtle: `text-primary-200 dark:text-white hover:text-primary-160 dark:hover:text-accent-200 transition-colors duration-200 font-medium text-sm`,
    ghost: `text-primary-200 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-3 py-1.5 transition-colors duration-200 text-sm font-medium`,
  };

  let classes = `${variantClasses[variant] || variantClasses.default} ${
    className || ''
  }`;
  let btnIcon = icon;
  let element = null;

  // Only show default icon for default variant
  if (!icon && showIcon && variant === 'default') {
    btnIcon = pathname.includes('/ar') ? (
      <BiLeftArrowAlt size={20} aria-hidden="true" />
    ) : (
      <BiRightArrowAlt size={20} aria-hidden="true" />
    );
  } else if (!showIcon || variant !== 'default') {
    btnIcon = null;
  }

  if (href)
    element = (
      <Link className={classes} href={href} rel={rel} aria-label={araiaLabel}>
        {children}
        {btnIcon}
      </Link>
    );

  if (!href)
    element = (
      <button
        type={type}
        className={classes}
        onClick={onClick}
        disabled={pending}
        aria-label={araiaLabel}
      >
        {children}
        {btnIcon}
        {pending && <SpinnerMini />}
      </button>
    );

  return element;
}

export default Button;
