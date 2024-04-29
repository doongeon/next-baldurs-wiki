import { useRecoilState, useSetRecoilState } from "recoil";
import { Rarity, rarityFilterState } from "../Atom";

export default function Filter() {
  const [rarityFilter, setRarityFilter] = useRecoilState(rarityFilterState);

  const toggleSet = (filter: Rarity) => {
    setRarityFilter((set) => {
      const newSet = set;

      if (!set.has(filter)) {
        newSet.add(filter);
        return newSet;
      }

      newSet.delete(filter);
      return newSet;
    });
  };

  const handleClick = (filter: Rarity) => {
    toggleSet(filter);
    console.log(rarityFilter);
  };

  return (
    <div>
      <div>
        희귀
        <div className="text-white">
          <div onClick={() => handleClick(Rarity.Legendary)}>전설</div>
        </div>
      </div>
    </div>
  );
}
