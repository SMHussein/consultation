import Heading from "./Heading";

export default function CardLiner({ title, text, icon, action }) {
  return (
    <div className="rounderd-sm shadow-md border p-4 flex flex-col sm:flex-row gap-8 justify-start items-center">
      <Heading
        type="tertiary"
        classes="flex items-center gap-6 text-center p-2 flex-1 font-semibold"
      >
        {icon}
        {title}
      </Heading>
      {text && <a href={`${action}:${text}`}>&#x200E;{text}</a>}
    </div>
  );
}
