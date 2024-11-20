import Image from "next/image";
import Button from "./Button";
import Heading from "./Heading";
import { BiPolygon } from "react-icons/bi";

export default function ServiceItem({ service }) {
  return (
    <div className="flex flex-col gap-6 justify-start">
      <div className="h-[270px]">
        <Image
          src={service.src}
          alt={service.name}
          width={690}
          height={270}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <Heading type="tertiary" classes="text-primary-100">
        {service.name}
      </Heading>
      <ul className="flex-1 flex flex-col gap-2">
        {service.items.map((item) => (
          <li className="flex items-center gap-2 text-accent-200 text-sm">
            <BiPolygon />
            {item}
          </li>
        ))}
      </ul>
      <Button variation="secondary" className="bg-accent-50 " href="#">
        Read More
      </Button>
    </div>
  );
}
