"use client";

import AutoCompleteSearchBar from "./components/AutoCompleteSearchBar";
import WeaponTable from "./components/WeaponTable";
import Title from "./components/Title";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { searchQueryState } from "./Atom";

export default function Page() {
  const setSearchQuery = useSetRecoilState(searchQueryState);

  useEffect(() => {
    setSearchQuery("");
  }, []);

  return (
    <>
      <WeaponTable />
    </>
  );
}
