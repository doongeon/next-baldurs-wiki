import { useRecoilState } from "recoil";
import { Rarity, rarityFilterState } from "../Atom";
import getRarityColor from "../src/getRarityColor";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface RarityFilterBtnProps {
  text: string;
  rarity: Rarity;
}

const Button = styled.div<{ rarity: Rarity; active: boolean }>`
  color: ${(props) => getRarityColor(props.rarity)};
  border: 1px solid ${(props) => getRarityColor(props.rarity)};
  text-shadow: ${(props) =>
    props.active
      ? "0px 0px 10px " +
        getRarityColor(props.rarity) +
        ", 0px 0px 20px rgba(255,255,255,0.9)"
      : ""};
  box-shadow: ${(props) =>
    props.active
      ? "0px 0px 15px " +
        getRarityColor(props.rarity) +
        ", inset 0px 0px 5px " +
        getRarityColor(props.rarity)
      : ""};
  transition: linear 0.1s;
`;

export default function RarityFilterBtn({
  text,
  rarity,
}: RarityFilterBtnProps) {
  const [rarityFilter, setRarityFilter] = useRecoilState(rarityFilterState);
  const [active, setActive] = useState(false);

  const toggleSet = (filter: Rarity) => {
    setRarityFilter((set) => {
      const newSet = new Set(set);

      if (!newSet.has(filter)) {
        newSet.add(filter);
        return newSet;
      }

      newSet.delete(filter);
      return newSet;
    });
  };

  const handleClick = (filter: Rarity) => {
    toggleSet(filter);
  };

  useEffect(() => {
    if (rarityFilter.has(rarity)) {
      setActive(true);
      return;
    }

    setActive(false);
  }, [rarityFilter]);

  return (
    <Button
      rarity={rarity}
      active={active}
      onClick={() => handleClick(rarity)}
      className="cursor-pointer"
    >
      {text}
    </Button>
  );
}
