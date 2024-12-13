import Heading from "./Heading";
import {
  BsEnvelope,
  BsTelephone,
  BsGlobe,
  BsCash,
  BsFillPinMapFill,
  BsBuildings,
  BsCardChecklist,
  BsSliders2,
  BsEnvelopePaper,
  BsLinkedin,
  BsCardList,
  BsFileEarmarkPerson,
} from "react-icons/bs";

const classes = `text-primary-200 bg-primary-150 rounded-sm shadow-md bg-accent-100 hover:bg-primary-160 inline-flex gap-2 items-center justify-center transition-all min-w-[150px] inline-block py-2 px-4 disabled:opacity-70 disabled:cursor-not-allowed`;

const fieldIcons = {
  email: BsEnvelope,
  phone: BsTelephone,
  nationality: BsGlobe,
  salary: BsCash,
  location: BsFillPinMapFill,
  company: BsBuildings,
  university: BsCardChecklist,
  arabic: BsSliders2,
  english: BsSliders2,
  extraInfo: BsEnvelopePaper,
};

const fieldLabels = {
  email: "Email",
  phone: "Phone Number",
  nationality: "Nationality",
  salary: "Expected Salary (SAR)",
  location: "Current Location",
  company: "Current Company",
  university: "University Degree",
  arabic: "Arabic Proficiency",
  english: "English Proficiency",
  extraInfo: "Extra Info",
};

export default function ApplicantCard({ applicant }) {
  const { name, linkedin, cv, extraInfo, ...fields } = applicant;

  const fieldEntries = Object.entries(fields).filter(
    ([key, value]) => value && fieldIcons[key]
  );
  const chunkSize = Math.ceil(fieldEntries.length / 3);
  const chunks = [
    fieldEntries.slice(0, chunkSize),
    fieldEntries.slice(chunkSize, 2 * chunkSize),
    fieldEntries.slice(2 * chunkSize),
  ];

  return (
    <div className="rounded-sm shadow-md border p-6 flex flex-col gap-4 text-primary-200">
      <Heading
        type="secondary"
        classes="flex items-start gap-6 justify-start text-center border-b py-2"
      >
        <BsFileEarmarkPerson size={30} className="text-primary-170" />
        {name}
      </Heading>
      <div className="flex flex-row gap-4 justify-between">
        {chunks.map((chunk, index) => (
          <div key={index} className="flex flex-col flex-1">
            {chunk.map(([key, value]) => {
              const Icon = fieldIcons[key];
              return (
                <Para key={key} className="whitespace-nowrap">
                  <Icon size={20} className="text-primary-170" />
                  {fieldLabels[key]}: <Span>{value}</Span>
                </Para>
              );
            })}
          </div>
        ))}
      </div>
      {extraInfo && (
        <div className="mt-4 pt-4">
          <Para>
            <span>
              <BsEnvelopePaper size={20} className="text-primary-170" />
            </span>
            {fieldLabels.extraInfo}: <Span>{extraInfo}</Span>
          </Para>
        </div>
      )}
      <div className="flex items-center gap-2 justify-center mt-4">
        {linkedin && (
          <Link href={linkedin} icon={<BsLinkedin size={20} />}>
            LinkedIn URL
          </Link>
        )}
        {cv && (
          <Link href={cv} type="download" icon={<BsCardList size={20} />}>
            Download CV
          </Link>
        )}
      </div>
    </div>
  );
}

function Span({ children }) {
  return <span className="italic font-normal">{children}</span>;
}

function Para({ children, className }) {
  return (
    <p
      className={`font-bold flex gap-4 items-center no-wrap border-b px-2 py-4 text-sm ${className}`}
    >
      {children}
    </p>
  );
}

function Link({ href, children, target = "_blank", type, icon }) {
  const attributes = { href, type, target, className: classes };
  return (
    <a {...attributes}>
      {icon} {children}
    </a>
  );
}
