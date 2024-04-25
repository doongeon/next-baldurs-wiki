import { atom } from "recoil";

export const searchQueryState = atom<string>({
  key: "searchQuery", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const inputFocusState = atom<boolean>({
  key: "inputFocusState",
  default: false,
});
