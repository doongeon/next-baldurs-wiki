import Link from "next/link";
import { Weapon } from "../src/interfaces";
import { useRouter } from "next/navigation";

interface AutoCompleteSearchBarProps {
  resultTitle: string;
  matchedItems: Weapon[];
}

export default function AutoCompleteSearch({
  resultTitle,
  matchedItems,
}: AutoCompleteSearchBarProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-700 flex flex-col gap-px">
      <h3 className="text-center py-1 bg-gray-900">{resultTitle}</h3>
      {matchedItems.map((item) => (
        <div className="flex flex-col bg-gray-900">
          <Link href={`/asset/${item.id}`}>{item.name_ko}</Link>
        </div>
      ))}
    </div>
  );
}
