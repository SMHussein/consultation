import Link from "next/link";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";

function Button({ href, type, icon, children, className, onClick, locale }) {
  let classes = `text-primary-200 bg-primary-150 rounded-sm shadow-md bg-accent-100 hover:bg-primary-160 inline-flex gap-2 items-center justify-center transition-all min-w-[150px] inline-block py-2 px-4 ${className} `;
  let btnIcon = icon;
  let element = null;

  if (!icon) {
    btnIcon =
      locale === "ar" ? (
        <BiLeftArrowAlt size={20} />
      ) : (
        <BiRightArrowAlt size={20} />
      );
  }

  if (href)
    element = (
      <Link className={classes} href={href}>
        {children}
        {btnIcon}
      </Link>
    );

  if (!href)
    element = (
      <button type={type} className={classes} onClick={onClick}>
        {children}
        {btnIcon}
      </button>
    );

  return element;
}

export default Button;
