import { gameData } from "../../gameData";

const weapons = gameData.weapons;

export default function filterWeapon(searchQuery: string) {
  const nameMatchedItems = weapons.filter(
    (weapon) =>
      weapon.name_ko?.includes(searchQuery) ||
      weapon.name_en?.toLowerCase().includes(searchQuery?.toLowerCase())
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
  const matchedItems = Array.from(new Set(combinedWeapons));

  return { nameMatchedItems, matchedItems };
}
