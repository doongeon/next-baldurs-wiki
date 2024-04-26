import { Weapon } from "../src/interfaces";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { autoCompeleteViewState } from "../Atom";

interface AutoCompleteSearchBarProps {
  resultTitle: string;
  matchedItems: Weapon[];
}

export default function AutoCompleteSearch({
  resultTitle,

  matchedItems,
}: AutoCompleteSearchBarProps) {
  const setAutoCompeleteView = useSetRecoilState(autoCompeleteViewState);
  const router = useRouter();

  const handleClick = (itemID: number) => {
    setAutoCompeleteView(false);
    router.push(`/asset/${itemID + ""}`);
  };

  return (
    <div className="bg-gray-700 flex flex-col gap-px">
      <h3 className="text-center py-1 bg-gray-900">{resultTitle}</h3>
      {matchedItems.map((item) => (
        <div
          className="bg-gray-900 cursor-pointer hover:bg-gray-800"
          onClick={() => handleClick(item.id)}
        >
          {item.name_ko}
        </div>
      ))}
    </div>
  );
}
