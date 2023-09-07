/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './globals.css';
import Layout from './components/layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
          <Layout>
          {children}
          </Layout>
      </body>
    </html>
  );
}