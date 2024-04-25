import Recoil from "./Recoil";
import AutoCompleteSearchBar from "./components/AutoCompleteSearchBar";
import Title from "./components/Title";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Recoil>
          <main className="h-screen flex flex-col items-center text-white py-48 gap-10 overflow-auto">
            <div className="pb-10">
              <Title />
              <AutoCompleteSearchBar />
            </div>
            {children}
          </main>
        </Recoil>
      </body>
    </html>
  );
}
