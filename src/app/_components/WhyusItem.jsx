import Heading from "./Heading";

export default function WhyusItem({ title, text, icon }) {
  return (
    <div className="flex flex-col gap-12">
      <Heading
        type="tertiary"
        classes="flex flex-col gap-4  items-center bg-primary-200 color-white"
        isLight={true}
      >
        {icon}
        {title}
      </Heading>
      <p>{text}</p>
    </div>
  );
}
