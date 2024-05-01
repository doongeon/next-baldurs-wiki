import { Rarity } from "../Atom";

export default function getRarityColor(rarity: Rarity | string): string {
  if (rarity === Rarity.Legendary) return "rgb(255, 89, 0)";
  if (rarity === Rarity.VeryRare) return "rgb(209, 0, 123)";
  if (rarity === Rarity.Rare) return "#01BFFF";
  if (rarity === Rarity.Uncommon) return "#01BD39";
  return "#D2D2D2";
}
