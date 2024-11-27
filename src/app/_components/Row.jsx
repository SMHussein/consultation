export default function Row({ children, classes, grid }) {
  let padding = "py-12 px-4";

  switch (grid) {
    case 1:
      padding += " sm:px-6";
      break;
    case 2:
      padding += " sm:px-12";
      break;
    case 3:
      padding += " sm:px-24";
      break;
    case 4:
      padding += " sm:px-32";
    //   break;
    default:
      break;
  }

  return (
    <div className={`mx-auto max-w-7xl ${classes} ${padding}`}>{children}</div>
  );
}
