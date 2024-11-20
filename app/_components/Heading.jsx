export default function Heading({ children, type = "secondary", classes }) {
  let element;

  const classNames = `uppercase ${classes} text-primary-200`;

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
