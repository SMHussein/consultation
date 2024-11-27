export default function Heading({
  children,
  type = "secondary",
  classes,
  isLight = false,
}) {
  let element;

  let classNames = `uppercase ${classes}`;

  if (isLight) classNames += " text-accent-50";

  if (!isLight) classNames += " text-primary-200";

  switch (type) {
    case "primary":
      element = <h1 className={`${classNames} text-3xl`}>{children}</h1>;
      break;
    case "secondary":
      element = <h2 className={`${classNames} text-2xl`}>{children}</h2>;
      break;
    case "tertiary":
      element = <h3 className={`${classNames} text-md`}>{children}</h3>;
      break;
    default:
      break;
  }

  return element;
}
