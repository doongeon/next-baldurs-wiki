import { Weapon } from "../src/interfaces";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { autoCompeleteViewState } from "../Atom";
import getRarityColor from "../src/getRarityColor";

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
    <div className="bg-neutral-600 flex flex-col gap-px ">
      <h3 className="text-center py-1 bg-neutral-600">{resultTitle}</h3>
      {matchedItems.map((item) => (
        <div
          className="bg-neutral-900 cursor-pointer py-2 px-5 transition select-none text-[--user-color] relative after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-white after:opacity-0 after:hover:opacity-15 after:blur-sm after:transition"
          style={{
            "--user-color": getRarityColor(item.rarity),
          }}
          onClick={() => handleClick(item.id)}
        >
          {item.name_ko}
        </div>
      ))}
    </div>
  );
}
