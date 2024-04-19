"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { gameData } from "../gameData_01";
import React, { useEffect, useState } from "react";
import { WeaponTrait } from "../type";




type Inputs = {
  searchString: string;
};

export default function Page() {
  const [suggestedItems, setSuggestedItems] = useState<
    {
      name_ko: string;
      name_en: string;
      damage: string[];
      weaponRange: string;
      trait: string[];
      enchantment: string;
      special: string[];
      weaponActions: string[];
      info: string;
    }[]
  >([]);

  const weapons = gameData.weapons;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ searchString }) => {
    // 입력 값과 일치하는 아이템을 찾아서 제안
    const matchedItems = weapons.filter((item) =>
      item.name_ko.includes(searchString)
    );
    setSuggestedItems(matchedItems);
  };

  useEffect(() => {
    if (watch("searchString") === "") {
      setSuggestedItems([]);
      return;
    }

    const matchedItems = weapons.filter((item) =>
      item.name_ko.includes(watch("searchString"))
    );

    setSuggestedItems(matchedItems);
  }, [watch()]);

  return (
    <>
      <h1>BG3 DICT</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("searchString", {
            required: true,
          })}
        />
        <input type="submit" />
      </form>

      <h2>검색 아이템</h2>
      <ul>
        {/* 제안된 아이템 목록 표시 */}
        {suggestedItems.map((item, index) => (
          <li key={index}>{item.name_ko}</li>
        ))}
      </ul>

      <h2>모든 아이템</h2>
      <ul>
        {weapons.map((weapon) => (
          <li>
            <div>{weapon.name_ko}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
