'use client';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi';
import { Link } from '@/src/i18n/routing';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import SpinnerMini from './SpinnerMini';

function Button({ href, type, icon, children, className, onClick, rel }) {
  const pathname = usePathname();
  const { pending } = useFormStatus();

  let classes = `text-primary-200 bg-primary-150 rounded-sm shadow-md bg-accent-100 hover:bg-primary-160 inline-flex gap-2 items-center justify-center transition-all min-w-[150px] inline-block py-2 px-4 disabled:opacity-70 disabled:cursor-not-allowed ${className} `;
  let btnIcon = icon;
  let element = null;

  if (!icon) {
    btnIcon = pathname.includes('/ar') ? (
      <BiLeftArrowAlt size={20} />
    ) : (
      <BiRightArrowAlt size={20} />
    );
  }

  if (href)
    element = (
      <Link className={classes} href={href} rel={rel}>
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
      >
        {children}
        {btnIcon}
        {pending && <SpinnerMini />}
      </button>
    );

  return element;
}

export default Button;
