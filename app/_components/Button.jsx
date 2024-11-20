import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

function Button({
  href,
  type,
  customIcon,
  variation = "primary",
  children,
  className,
  onClick,
}) {
  let classes = `rounded-sm shadow-md bg-accent-100 hover:bg-accent-50 inline-flex gap-2 items-center justify-center transition-all min-w-[150px] inline-block py-2 px-4 ${className} `;
  let icon;

  if (variation === "primary") {
    classes += " text-primary-50";
    icon = customIcon;
  }

  if (variation === "secondary") {
    classes += " text-primary-50";
    icon = <BiRightArrowAlt size={20} />;
  }

  let element = null;

  if (href)
    element = (
      <Link className={classes} href={href}>
        {children}
        {icon}
      </Link>
    );

  if (!href)
    element = (
      <button type={type} className={classes} onClick={onClick}>
        {children}
        {icon}
      </button>
    );

  return element;
}

export default Button;
