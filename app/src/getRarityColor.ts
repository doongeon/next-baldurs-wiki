import { Rarity } from "../Atom";

export default function getRarityColor(rarity: Rarity | string): string {
  if (rarity === Rarity.Legendary) return "#FF5900";
  if (rarity === Rarity.VeryRare) return "#D1007B";
  if (rarity === Rarity.Rare) return "#01BFFF";
  if (rarity === Rarity.Uncommon) return "#01BD39";
  return "#D2D2D2";
}
