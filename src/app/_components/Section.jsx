export default function Section({
  children,
  classes,
  isLight = true,
  isBule = false,
  noBg = false,
}) {
  let themeClass = "";

  if (!noBg) {
    themeClass = isLight
      ? "bg-white text-primary-200 dark:bg-black dark:text-white"
      : isBule
      ? "bg-primary-200  text-accent-50 dark:bg-black"
      : "bg-accent-150 text-primary-200  dark:bg-primary-210 dark:text-white";
  }
  const classNames = `relatived dark:text-white ${classes || ""} ${themeClass}`;
  return <section className={`${classNames}`}>{children}</section>;
}
