"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { gameData } from "../gameData_v02";
import React, { useEffect, useState } from "react";

interface Weapon {
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
}

type Inputs = {
  searchString: string;
};

export default function Page() {
  const [matchedItems, setMatchedItems] = useState<Weapon[]>([]);
  const [fillterState, setFilterState] = useState<string>("maxDamage");

  const weapons = gameData.weapons;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ searchString }) => {
    const nameMatchedItems = weapons.filter((weapon) =>
      weapon.name_ko.includes(watch("searchString"))
    );

    const traitMatchedItems = weapons.filter(
      (weapon) =>
        weapon.trait.filter((trait) => trait.includes(watch("searchString")))
          .length > 0
    );

    const specialMatchedItems = weapons.filter(
      (weapon) =>
        weapon.special.filter((trait) => trait.includes(watch("searchString")))
          .length > 0
    );

    const typeMatchedItems = weapons.filter(
      (weapon) =>
        weapon.damage.filter((item) => item.includes(watch("searchString")))
          .length > 0
    );

    const combinedWeapons = [
      ...nameMatchedItems,
      ...traitMatchedItems,
      ...specialMatchedItems,
      ...typeMatchedItems,
    ];

    // 중복을 제거하기 위해 Set 객체로 변환 후 다시 배열로 변환
    const matchedWeapons = Array.from(new Set(combinedWeapons));

    setMatchedItems(matchedWeapons);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    // if(fillterState === 'maxDamage') weapons.sort((a,b) => b.damageStat.maxDamage - a.damageStat.maxDamage)
    weapons.sort((o1, o2) => (o1.name_ko > o2.name_ko ? 1 : -1));
  }, [fillterState]);

  useEffect(() => {
    // if (watch("searchString").trim() === "") {
    //   setNameMatchedItems([]);
    //   return;
    // }

    const nameMatchedItems = weapons.filter((weapon) =>
      weapon.name_ko.includes(watch("searchString"))
    );

    const traitMatchedItems = weapons.filter(
      (weapon) =>
        weapon.trait.filter((trait) => trait.includes(watch("searchString")))
          .length > 0
    );

    const specialMatchedItems = weapons.filter(
      (weapon) =>
        weapon.special.filter((trait) => trait.includes(watch("searchString")))
          .length > 0
    );

    const typeMatchedItems = weapons.filter(
      (weapon) =>
        weapon.damage.filter((item) => item.includes(watch("searchString")))
          .length > 0
    );

    const combinedWeapons = [
      ...nameMatchedItems,
      ...traitMatchedItems,
      ...specialMatchedItems,
      ...typeMatchedItems,
    ];

    // 중복을 제거하기 위해 Set 객체로 변환 후 다시 배열로 변환
    const matchedWeapons = Array.from(new Set(combinedWeapons));

    setMatchedItems(matchedWeapons);
  }, [watch("searchString")]);

  return (
    <main
      style={{
        backgroundImage: `url('/images/BG3-wallpaper.jpg'), linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.8))`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-screen flex flex-col items-center text-white py-48 gap-10 overflow-auto"
    >
      <h1 className="text-7xl font-bold">BG3 DICT</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-black"
          {...register("searchString", {
            required: true,
          })}
          autoComplete="on"
          lang="ko"
        />
      </form>
      <div className="h-auto bg-slate-600 w-auto text-center py-5 px-8">
        <h2 className="text-2xl font-bold px-5 pb-3">검색 아이템</h2>
        {matchedItems.length === 0 ? (
          "없어요"
        ) : (
          <table id="weapon-table" className="">
            <thead>
              <tr>
                <th>이름</th>
                <th>🎲</th>
                <th>최대 대미지</th>
                <th>대미지 기댓값</th>
              </tr>
            </thead>
            <tbody id="weapon-table-body">
              {matchedItems.map((weapon) => {
                return (
                  <tr className="border-b-white border-b-2 border-opacity-50 whitespace-pre-line h-16">
                    <td>{weapon.name_ko}</td>
                    <td>{weapon.damage.join("\n")}</td>
                    <td>{weapon.damageStat.maxDamage}</td>
                    <td>{weapon.damageStat.meanDamage}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* <ul
          key={"nameMatches"}
          className="flex flex-col gap-1 items-start px-10 py-5"
        >
          {nameMatchedItems.map((item, index) => (
            <li key={index}>{item.name_ko}</li>
          ))}
        </ul> */}
      </div>

      {weapons.slice(0, 1).map((weapon) => {
        return (
          <div className="max-w-lg rounded shadow-lg bg-gray-800 text-white">
            <div className="flex">
              <img
                className="w-16 h-16 object-cover ml-2 mt-2"
                src="https://bg3.wiki/w/images/4/4f/Scimitar_PlusOne_Icon.png?20230201003615"
                alt="Weapon"
              />{" "}
              {/* 이미지 */}
              <div className="flex flex-col">
                <div className="font-bold text-xl mb-2">{weapon.name_ko}</div>{" "}
                {/* 한국어 이름 */}
                <p className="text-gray-300 text-base">{weapon.name_en}</p>{" "}
                {/* 영어 이름 */}
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-gray-300 text-base">
                Damage
                <br />
                {weapon.damage.join(", ")}
              </p>{" "}
              {/* 데미지 */}
              <p className="text-gray-300 text-base">
                Weapon Range
                <br />
                {weapon.weaponRange}
              </p>{" "}
              {/* 무기 사거리 */}
              <p className="text-gray-300 text-base">
                Trait
                <br />
                {weapon.trait.join(", ")}
              </p>{" "}
              {/* 특성 */}
              <p className="text-gray-300 text-base">
                Enchantment: {weapon.enchantment}
              </p>{" "}
              {/* 인챈트 레벨 */}
              <p className="text-gray-300 text-base">
                {weapon.special.join("\n")}
              </p>{" "}
              {/* 특별 능력 */}
              <p className="text-gray-300 text-base">
                {weapon.weaponActions.join(", ")}
              </p>{" "}
              {/* 무기 행동 */}
              <p className="text-gray-300 text-base">
                Info
                <br />
                {weapon.info}
              </p>{" "}
              {/* 정보 */}
              <p className="text-gray-300 text-base">
                Max Damage
                <br />
                {weapon.damageStat.maxDamage}
              </p>{" "}
              {/* 최대 데미지 */}
              <p className="text-gray-300 text-base">
                Min Damage
                <br />
                {weapon.damageStat.minDamage}
              </p>{" "}
              {/* 최소 데미지 */}
              <p className="text-gray-300 text-base">
                Mean Damage
                <br />
                {weapon.damageStat.meanDamage}
              </p>{" "}
              {/* 평균 데미지 */}
            </div>
          </div>
        );
      })}
      {/* <h2>모든 아이템</h2>
      <ul key={"all"}>
        {weapons.map((weapon) => (
          <li>
            <div>{weapon.name_ko}</div>
          </li>
        ))}
      </ul> */}
    </main>
  );
}
