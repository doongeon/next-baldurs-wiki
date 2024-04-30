import Link from "next/link";
import { gameData } from "../../gameData";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import filterWeapon from "../src/filterWeapon";
import { Weapon } from "../src/interfaces";
import { useRecoilValue } from "recoil";
import { rarityFilterState } from "../Atom";
import getRarityColor from "../src/getRarityColor";
import AssetTableItem from "./AssetTableItem";

const weapons = gameData.weapons;

export default function AssetTable() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery");
  const [showAll, setShowAll] = useState(false);
  const [searchAssets, setSearchAssets] = useState<Weapon[]>([]);
  const rarityFilter = useRecoilValue(rarityFilterState);

  const toggleShowAll = () => {
    setShowAll((curr) => !curr);
  };

  useEffect(() => {
    if (!searchQuery) {
      if (rarityFilter.size === 0) {
        setSearchAssets(weapons);
        return;
      }

      setSearchAssets(
        weapons.filter((item) =>
          Array.from(rarityFilter).some((rarity) => item.rarity === rarity)
        )
      );

      return;
    }

    const { nameMatchedItems, matchedItems } = filterWeapon(searchQuery);

    const combinedWeapons = [...nameMatchedItems, ...matchedItems];
    // 중복을 제거하기 위해 Set 객체로 변환 후 다시 배열로 변환
    const allMatchedItems = Array.from(new Set(combinedWeapons));

    if (rarityFilter.size === 0) {
      setSearchAssets(allMatchedItems);
      return;
    }

    const filteredItems = allMatchedItems.filter((item) =>
      Array.from(rarityFilter).some((filter) => item.rarity === filter)
    );

    setSearchAssets(filteredItems);
  }, [searchQuery, rarityFilter]);

  return (
    <div className="w-full max-w-screen-sm h-96 flex flex-col gap-5">
      {searchAssets.length === 0 ? (
        <div className="text-white">없어요</div>
      ) : (
        <>
          <div
            className="w-24 text-white text-center border-white border-2 rounded-2xl cursor-pointer"
            onClick={toggleShowAll}
          >
            {showAll ? "접기" : "전부 보기"}
          </div>

          <table className="w-full max-w-screen-sm">
            <thead className="">
              <tr className="*:border-b-2 *:border-neutral-600 *:py-2">
                <th>이름</th>
                <th>데미지</th>
                <th>최대 데미지</th>
              </tr>
            </thead>
            <tbody>
              {searchAssets
                .sort(
                  (w1, w2) => -w1.damageStat.maxDamage + w2.damageStat.maxDamage
                )
                .slice(0, showAll ? weapons.length : 5)
                .map((weapon) => (
                  <AssetTableItem key={weapon.id} weapon={weapon} />
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
