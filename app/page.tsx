"use client";

import { gameData } from "../gameData";
import React, { useEffect, useState } from "react";
import AutoCompleteSearchBar from "./components/AutoCompleteSearchBar";
import SearchBar from "./components/SearchBar";
import Link from "next/link";
import WeaponTable from "./components/WeaponTable";
import Title from "./components/Title";

export interface Weapon {
  name_ko: string;
  name_en: string;
  damage: string[];
  weaponRange: number;
  trait: string[];
  enchantment: number;
  special: string[];
  weaponActions: string[];
  info: string;
  damageStat: {
    maxDamage: number;
    minDamage: number;
    meanDamage: number;
  };
  id: number;
  howToGet: string;
  comment: string;
}

export default function Page() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [nameMatchedItems, setNameMatchedItems] = useState<Weapon[]>([]);
  const [matchedItems, setMatchedItems] = useState<Weapon[]>([]);

  const weapons = gameData.weapons;

  useEffect(() => {
    const nameMatchedItems = weapons.filter(
      (weapon) =>
        weapon.name_ko.includes(searchQuery) ||
        weapon.name_en.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const traitMatchedItems = weapons.filter(
      (weapon) =>
        weapon.trait.filter((trait) => trait.includes(searchQuery)).length > 0
    );

    const specialMatchedItems = weapons.filter(
      (weapon) =>
        weapon.special.filter((trait) => trait.includes(searchQuery)).length > 0
    );

    const weaponActionMatchedItems = weapons.filter(
      (weapon) =>
        weapon.weaponActions.filter((weaponAction) =>
          weaponAction.includes(searchQuery)
        ).length > 0
    );

    const attackTypeMatchedItems = weapons.filter(
      (weapon) =>
        weapon.damage.filter((item) => item.includes(searchQuery)).length > 0
    );

    const intoMatchedItems = weapons.filter((weapon) =>
      weapon.info.includes(searchQuery)
    );

    const commentMatchedItems = weapons.filter((weapon) =>
      weapon.comment.includes(searchQuery)
    );

    const hotToGetMatchedItems = weapons.filter((weapon) =>
      weapon.howToGet.includes(searchQuery)
    );

    const combinedWeapons = [
      ...traitMatchedItems,
      ...specialMatchedItems,
      ...weaponActionMatchedItems,
      ...attackTypeMatchedItems,
      ...intoMatchedItems,
      ...commentMatchedItems,
      ...hotToGetMatchedItems,
    ];

    // 중복을 제거하기 위해 Set 객체로 변환 후 다시 배열로 변환
    const matchedWeapons = Array.from(new Set(combinedWeapons));

    setNameMatchedItems(nameMatchedItems);
    setMatchedItems(matchedWeapons);
  }, [searchQuery]);

  return (
    <>
      <div className="pb-10">
        <Title />
        <SearchBar setSearchQuery={setSearchQuery} />

        <div className="relative">
          <div className="bg-gray-700 p-px absolute w-full flex flex-col gap-px">
            {searchQuery !== "" && nameMatchedItems.length > 0 && (
              <AutoCompleteSearchBar
                resultTitle="이름"
                matchedItems={nameMatchedItems}
              />
            )}
            {searchQuery !== "" && matchedItems.length > 0 && (
              <AutoCompleteSearchBar
                resultTitle="상세정보"
                matchedItems={matchedItems}
              />
            )}
          </div>
        </div>
      </div>

      <WeaponTable />
    </>
  );
}
