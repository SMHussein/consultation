import Link from 'next/link';
import Button from './Button';
import Heading from './Heading';

export default function AdminJobCard({
  title,
  text,
  icon,
  href,
  type = 'secondary',
  applicantCount = 0,
}) {
  let classes = `text-primary-200 bg-primary-150 rounded-sm shadow-md bg-accent-100 hover:bg-primary-160 inline-flex gap-2 items-center justify-center transition-all min-w-[150px] inline-block py-2 px-4 disabled:opacity-70 disabled:cursor-not-allowed `;

  return (
    <div className="rounderd-sm shadow-md border p-6  flex flex-col gap-8">
      <Heading
        type={type}
        classes="flex items-center gap-6 justify-center text-center border-b py-2"
      >
        {icon}
        {title}
        {applicantCount && (
          <span className="text-primary-100">{`(${applicantCount})`}</span>
        )}
      </Heading>
      <p className="flex-1">{text}</p>
      {href && (
        <Link href={href} className={classes} type="secondary">
          Check Applicants
        </Link>
      )}
    </div>
  );
}
