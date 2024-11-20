import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

export default function TeamMember({ member }) {
  return (
    <li className="flex flex-col gap-2 text-center">
      <Link href={member.href} className="flex flex-col gap-2 border-b-2 pb-2">
        <Image
          src={member.src}
          alt={member.name}
          width={240}
          height={240}
          className="rounded-md"
        />
        <Heading type="tertiary" classes="text-primary-100">
          {member.name}
        </Heading>
      </Link>
      <p className="text-primary-50 text-sm">{member.position}</p>
    </li>
  );
}
