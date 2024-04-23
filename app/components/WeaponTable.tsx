import Link from "next/link";
import { gameData } from "../../gameData";
import { useState } from "react";

const weapons = gameData.weapons;

export default function WeaponTable() {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((curr) => !curr);
  };

  return (
    <>
      <div
        className="w-24 text-white text-center border-white border-2 rounded-2xl cursor-pointer"
        onClick={toggleShowAll}
      >
        {showAll ? "접기" : "전부 보기"}
      </div>
      <div style={{ backgroundColor: "#23232" }}>
        <div className="flex justify-around">
          <div className="w-40 text-center">이름</div>
          <div className="w-40 text-center">데미지</div>
          <div className="w-40 text-center">최대 데미지</div>
          <div className="w-40 text-center">데미지 기댓값</div>
        </div>
        <hr />

        {weapons
          .sort((w1, w2) => -w1.damageStat.maxDamage + w2.damageStat.maxDamage)
          .slice(0, showAll ? weapons.length : 5)
          .map((weapon) => (
            <>
              <Link href={`asset/${weapon.id}`}>
                <div className="flex justify-around p-3 hover:bg-slate-800 ">
                  <div className="w-40">{weapon.name_ko}</div>
                  <div className="w-40 flex flex-col">
                    {weapon.damage.map((damage) => (
                      <div>{damage}</div>
                    ))}
                  </div>
                  <div className="w-40 text-center">
                    {weapon.damageStat.maxDamage}
                  </div>
                  <div className="w-40 text-center">
                    {weapon.damageStat.meanDamage}
                  </div>
                </div>
              </Link>
              <hr />
            </>
          ))}
      </div>
    </>
  );
}
