import { Rarity } from "../Atom";

export interface Weapon {
  name_ko: string;
  name_en?: string;
  damage: string[];
  weaponRange: number;
  trait: string[];
  enchantment?: number;
  special: string[];
  weaponActions: string[];
  info?: string;
  damageStat: {
    maxDamage: number;
    minDamage: number;
    meanDamage: number;
  };
  id: number;
  howToGet?: string;
  comment?: string;
  rarity: string;
}
