import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Providers } from './providers';

const roboto = Roboto({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RoomCare.Pro - Hotel Management Solutions',
  description: 'Streamline your hotel operations with RoomCare.Pro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}