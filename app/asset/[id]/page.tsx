"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { gameData } from "../../../gameData";
import AssetCard from "../../components/AssetCard";
import { Weapon } from "../../src/interfaces";

const weapons = gameData.weapons;

export default function Page() {
  const [asset, setAsset] = useState<Weapon>(null);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const assetId = Number(params.id);
    const asset = weapons.find((item) => item.id === assetId);

    if (asset) setAsset(asset);
  }, []);

  return (
    <>
      {!asset && <div className="text-white">없어요</div>}
      {asset && <AssetCard asset={asset} />}
    </>
  );
}
