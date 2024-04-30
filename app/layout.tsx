import Recoil from "./Recoil";
import AutoCompleteSearchBar from "./components/AutoCompleteSearchBar";
import SearchBar from "./components/SearchBar";
import Title from "./components/Title";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="w-screen bg-neutral-900 flex flex-col items-center text-white py-36 px-10 m-auto gap-10 overflow-auto">
        <Title />
        <Recoil>
          <SearchBar />
          {children}
        </Recoil>
      </body>
    </html>
  );
}
