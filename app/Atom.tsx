import { atom } from "recoil";

export enum Rarity {
  "Uncommon" = "Uncommon",
  "Rare" = "Rare",
  "VeryRare" = "VeryRare",
  "Legendary" = "Legendary",
  "Common" = "Common",
}

export const searchQueryState = atom<string>({
  key: "searchQuery", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const autoCompeleteViewState = atom<boolean>({
  key: "autoCompeleteFocusState",
  default: false,
});

export const rarityFilterState = atom<Set<Rarity>>({
  key: "rarityFilterState",
  default: new Set,
});
