import Heading from "./Heading";
import { BsPersonWalking, BsFillMapFill } from "react-icons/bs";
export default function JobHeading({ title, location, type }) {
  return (
    <div className="flex flex-col gap-2 text-sm border-b py-4">
      <Heading classes="mb-2 flex items-center gap-4" type="primary">
        {title}
      </Heading>
      <p className="italic flex items-center gap-2">
        <BsFillMapFill size={15} className="text-primary-170" />
        {location}
      </p>
      <p className="italic flex items-center gap-2">
        <BsPersonWalking size={15} className="text-primary-170" />
        {type}
      </p>
    </div>
  );
}
