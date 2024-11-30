import Heading from "./Heading";

export default function WhyusItem({ title, text, icon }) {
  return (
    <div className="flex flex-col gap-4 border shadow-lg rounded-sm">
      <Heading
        type="tertiary"
        classes="flex gap-4 items-center bg-primary-200 color-white rounded-sm p-6"
        isLight={true}
      >
        {icon}
        {title}
      </Heading>
      <p className="p-2">{text}</p>
    </div>
  );
}
