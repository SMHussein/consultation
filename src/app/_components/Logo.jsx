import Image from "next/image";
import { Link } from "@/src/i18n/routing";

export default function Logo() {
  return (
    <Link href="/" className="flex">
      <Image src="/logo.png" height={200} width={180} alt="Logo" />
    </Link>
  );
}
