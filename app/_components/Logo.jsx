import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.png" height={150} width={150} alt="Logo" />
    </Link>
  );
}
