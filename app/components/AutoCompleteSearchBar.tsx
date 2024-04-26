"use client";

import { useEffect, useState } from "react";
import {
  autoCompeleteViewState,
  searchQueryState,
} from "../Atom";
import AutoCompleteSearch from "./SearchAutoComplete";
import { useRecoilState, useRecoilValue } from "recoil";
import SearchBar from "./SearchBar";
import filterWeapon from "../src/filterWeapon";
import { Weapon } from "../src/interfaces";

interface AutoCompleteSearchBarProps {
  assetName?: string;
}

export default function AutoCompleteSearchBar({
  assetName,
}: AutoCompleteSearchBarProps) {
  const searchQuery = useRecoilValue(searchQueryState);
  const [autoCompleteView, setAutoCompleteView] = useRecoilState(
    autoCompeleteViewState
  );
  const [nameMatchedItems, setNameMatchedItems] = useState<Weapon[]>([]);
  const [matchedItems, setMatchedItems] = useState<Weapon[]>([]);

  useEffect(() => {
    const { nameMatchedItems, matchedItems } = filterWeapon(searchQuery);
    setNameMatchedItems(nameMatchedItems);
    setMatchedItems(matchedItems);
  }, [searchQuery]);

  return (
    <div>
      <SearchBar />

      {autoCompleteView ? (
        <div className="relative">
          <div className="bg-gray-700 p-px absolute w-80 flex flex-col gap-px">
            {searchQuery !== "" && nameMatchedItems.length > 0 && (
              <AutoCompleteSearch
                resultTitle="이름"
                matchedItems={nameMatchedItems}
              />
            )}
            {searchQuery !== "" && matchedItems.length > 0 && (
              <AutoCompleteSearch
                resultTitle="상세정보"
                matchedItems={matchedItems}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
