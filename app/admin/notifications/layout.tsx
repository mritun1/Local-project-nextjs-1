import Head from 'next/head';
import '../../styles/scss/global.scss';
import '../../styles/scss/admin.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {/* Include your meta tags, title, and other document-wide settings here */}
        <title>Your Page Title</title>
      </Head>
      <body>{children}</body>
    </html>
  );
}
