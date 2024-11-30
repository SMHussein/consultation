import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.png" height={200} width={180} alt="Logo" />
    </Link>
  );
}
