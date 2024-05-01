import Link from "next/link";
import { Weapon } from "../src/interfaces";
import getRarityColor from "../src/getRarityColor";

interface AssetTableItem {
  weapon: Weapon;
}

export default function AssetTableItem({ weapon }: AssetTableItem) {
  return (
    <Link
      className="w-full grid grid-cols-3 border-b-2 border-b-neutral-600 py-3 gap-10 relative after:bg-white after:top-0 after:left-0 after:w-full hover:after:h-full hover:after:-z-10 after:blur-md hover:after:opacity-10 after:transition after:absolute after:opacity-0"
      href={`asset/${weapon.id}`}
    >
      <div
        className="flex justify-start items-center"
        style={{ color: `${getRarityColor(weapon.rarity)}` }}
      >
        {weapon.name_ko}
      </div>
      <div className="flex flex-col">
        {weapon.damage.map((damage) => (
          <div>{damage}</div>
        ))}
      </div>
      <div className="flex justify-start items-center">{weapon.damageStat.maxDamage}</div>
    </Link>
  );
}

// <Link href={`asset/${weapon.id}`} className="w-full h-full">
