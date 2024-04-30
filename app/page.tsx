"use client";

import AssetTable from "./components/AssetTable";
import Filter from "./components/Filter";

export default function Page() {
  return (
    <>
      <Filter />
      <div className="bg-neutral-500 h-px max-w-screen-sm w-full" />
      <AssetTable />
    </>
  );
}
