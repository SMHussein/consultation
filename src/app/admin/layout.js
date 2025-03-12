import '@/src/app/globals.css';
import localFont from 'next/font/local';
import ToasterLayout from '@/src/app/_components/Toaster';
import Sidebar from '@/src/app/_sections/Sidebar';
import { getUser } from '@/src/app/_api/services';
import LoginPage from '@/src/app/_sections/Login';

const georgia = localFont({
  src: '../fonts/georgia.ttf',
  variable: '--font-georgia',
});

export default async function AdminLayout({ children }) {
  const user = await getUser();
  let element;

  if (user) {
    element = (
      <main className="grid grid-cols-[max-content_1fr] h-dvh">
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
