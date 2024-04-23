import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main className="h-screen flex flex-col items-center text-white py-48 gap-10 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
