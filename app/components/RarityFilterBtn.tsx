import { useRecoilState } from "recoil";
import { Rarity, rarityFilterState } from "../Atom";
import getRarityColor from "../src/getRarityColor";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface RarityFilterBtnProps {
  text: string;
  rarity: Rarity;
}

const Button = styled.button<{ rarity: Rarity; active: boolean }>`
  color: ${(props) =>
    props.active ? "rgba(255,255,255, 0.8)" : getRarityColor(props.rarity)};
  font-weight: 400;
  border: 1px solid ${(props) => getRarityColor(props.rarity)};
  text-shadow: ${(props) => "0px 0px 5px " + getRarityColor(props.rarity)};
  box-shadow: ${(props) =>
    "0px 0px 15px " +
    getRarityColor(props.rarity) +
    ", inset 0px 0px 5px " +
    getRarityColor(props.rarity)};
  transition: linear 0.4s;
  position: relative;

  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: blur(10px);
    background-color: ${(props) =>
      props.active ? getRarityColor(props.rarity) : "transparent"};
    transition: linear 0.4s;
  }
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
      className="cursor-pointer px-2 py-1 select-none"
    >
      {text}
    </Button>
  );
}
