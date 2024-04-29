import { Rarity } from "../Atom";
import RarityFilterBtn from "./RarityFilterBtn";

export default function Filter() {
  return (
    <div>
      <div className="text-center">
        희귀
        <div className="text-white flex gap-5 *:py-1 *:px-2 mt-2">
          <RarityFilterBtn text="전설" rarity={Rarity.Legendary} />
          <RarityFilterBtn text="매우 희귀" rarity={Rarity.VeryRare} />
          <RarityFilterBtn text="희귀" rarity={Rarity.Rare} />
          <RarityFilterBtn text="고급" rarity={Rarity.Uncommon} />
          <RarityFilterBtn text="평범" rarity={Rarity.Common} />
        </div>
      </div>
    </div>
  );
}
