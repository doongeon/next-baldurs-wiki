import { Weapon } from "../src/interfaces";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { autoCompeleteViewState } from "../Atom";

interface AutoCompleteSearchBarProps {
  resultTitle: string;
  matchedItems: Weapon[];
}

export default function AutoCompleteItem({
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
    <div className="bg-neutral-600 flex flex-col gap-px">
      <h3 className="text-center py-1 bg-neutral-600">{resultTitle}</h3>
      {matchedItems.map((item) => (
        <div
          className="bg-neutral-900 cursor-pointer hover:bg-neutral-600 py-2 px-5 transition select-none"
          onClick={() => handleClick(item.id)}
        >
          {item.name_ko}
        </div>
      ))}
    </div>
  );
}
