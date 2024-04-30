import Link from "next/link";
import { Weapon } from "../src/interfaces";
import getRarityColor from "../src/getRarityColor";

interface AssetTableItem {
  weapon: Weapon;
}

export default function AssetTableItem({ weapon }: AssetTableItem) {
  return (
    <tr className="*:border-b-2 *:border-neutral-600">
      <td style={{ color: `${getRarityColor(weapon.rarity)}` }}>
        {weapon.name_ko}
      </td>
      <td className="w-full flex flex-col gap-1">
        {weapon.damage.map((damage) => (
          <div>{damage}</div>
        ))}
      </td>
      <td className="text-center">{weapon.damageStat.maxDamage}</td>
    </tr>
  );
}

// <Link href={`asset/${weapon.id}`} className="w-full h-full">
