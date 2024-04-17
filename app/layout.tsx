import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Head>
        <title>인터넷판</title>
        <link rel="stylesheet" href="https://unpkg.com/xp.css"></link>
      </Head>
      <body>{children}</body>
    </html>
  );
}
