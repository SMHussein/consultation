import Heading from "./Heading";

export default function Card({ title, text, icon }) {
  return (
    <div className="rounderd-sm shadow-md border p-6 bg-accent-150 flex flex-col gap-8">
      <Heading
        type="secondary"
        classes="flex items-center gap-6 text-center border-b py-2"
      >
        {icon}
        {title}
      </Heading>
      <p>{text}</p>
    </div>
  );
}
