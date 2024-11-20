export default function Section({ children, classes, grid = 1 }) {
  return <section className={`${classes}`}>{children}</section>;
}
