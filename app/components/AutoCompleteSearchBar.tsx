"use client";

import { useEffect, useState } from "react";
import { autoCompeleteViewState, searchQueryState } from "../Atom";
import { useRecoilState, useRecoilValue } from "recoil";
import filterWeapon from "../src/filterWeapon";
import { Weapon } from "../src/interfaces";
import AutoCompleteItem from "./AutoCompleteItem";

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
    <>
      {autoCompleteView ? (
        <div className="bg-gray-800 p-px absolute flex flex-col gap-px top-11 left-0 w-full z-50">
          {searchQuery !== "" && nameMatchedItems.length > 0 && (
            <AutoCompleteItem
              resultTitle="이름"
              matchedItems={nameMatchedItems}
            />
          )}
          {searchQuery !== "" && matchedItems.length > 0 && (
            <AutoCompleteItem
              resultTitle="상세정보"
              matchedItems={matchedItems}
            />
          )}
        </div>
      ) : null}
    </>
  );
}
