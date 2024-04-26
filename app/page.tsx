"use client";

import AssetTable from "./components/AssetTable";
import Filter from "./components/Filter";

export default function Page() {
  return (
    <>
      <Filter />
      <AssetTable />
    </>
  );
}
