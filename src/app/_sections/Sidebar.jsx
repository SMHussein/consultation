'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { logout } from '../_api/serverFunctions';
import Button from '../_components/Button';
import Image from 'next/image';

const NavLinks = [
  { id: 1, name: 'Dashboard', path: '/admin' },
  { id: 2, name: 'Jobs', path: '/admin/jobs' },
  { id: 3, name: 'Messages', path: '/admin/messages' },
  { id: 4, name: 'Subscribers', path: '/admin/subscribers' },
  { id: 5, name: 'Archive', path: '/admin/archive' },
];

function AdminNav() {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;

  return (
    <div className="flex flex-col">
      <nav className=" bg-accent-150 flex-1 pt-3">
        <ul className="flex flex-col items-center justify-center gap-6">
          <li>
            <Link href="/" className="flex">
              <Image src="/logo.png" height={200} width={180} alt="Logo" />
            </Link>
          </li>
          {NavLinks.map((link) => {
            return (
              <li
                key={link.id}
                className="text-primary-200 hover:text-primary-170 transition"
              >
                <Link
                  href={link.path}
                  className={isActive(link.path) ? ' text-primary-170' : ''}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <form action={logout}>
        <Button
          className="w-full"
          icon={<HiArrowLeftStartOnRectangle className="size-5" />}
        >
          Logout
        </Button>
      </form>
    </div>
  );
}

export default AdminNav;
