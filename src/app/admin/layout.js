import '@/src/app/globals.css';
import localFont from 'next/font/local';
import ToasterLayout from '@/src/app/_components/Toaster';
import Sidebar from '@/src/app/_sections/Sidebar';
import LoginPage from '@/src/app/_sections/Login';
import { getSession } from '../_api/session';

const georgia = localFont({
  src: '../fonts/georgia.ttf',
  variable: '--font-georgia',
});

export default async function AdminLayout({ children }) {
  const user = await getSession();
  let element;

  if (user && user.role === 'admin') {
    element = (
      <main className="grid grid-cols-[max-content_1fr] h-dvh relative">
        <Sidebar />
        {children}
      </main>
    );
  } else {
    element = <LoginPage />;
  }
  return (
    <html lang="en">
      <body className={georgia.className}>
        <ToasterLayout />
        {element}
      </body>
    </html>
  );
}
