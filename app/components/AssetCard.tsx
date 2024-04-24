import { Weapon } from "../page";

interface AssetCardProps {
  asset: Weapon;
}

export default function AssetCard({ asset }: AssetCardProps) {
  return (
    <>
      <div
        className="w-96 h-max px-5 py-5 rounded-3xl"
        style={{ backgroundColor: "#232323" }}
      >
        <div className="flex justify-between pb-3">
          <div className="h-20 flex flex-col justify-end">
            <div className="text-white text-2xl">{asset.name_ko}</div>
            <div className="text-white">{asset.name_en}</div>
          </div>
          <img
            width={100}
            height={100}
            src="https://via.placeholder.com/100x100"
          />
        </div>
        <hr />
        <div className="py-3">
          <div className="flex justify-around">
            <div className="w-36">데미지</div>
            <div className="w-36 flex-col">
              {asset.damage.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>

          <div className="flex justify-around">
            <div className="w-36 h-full items-center">범위</div>
            <div className="w-36">{asset.weaponRange}m</div>
          </div>

          <div className="flex justify-around">
            <div className="w-36">강화 수치</div>
            <div className="w-36">{asset.enchantment}</div>
          </div>
        </div>
        <hr />
        <div className="py-3">
          <div className="flex justify-around">
            <div className="w-36">특성</div>
            <div className="w-36 flex flex-col">
              {asset.trait.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>
        </div>
        <hr />

        <div className="py-3">
          <div className="w-36 px-3 pb-3">숙련 스킬</div>
          <div className="flex flex-col gap-3 whitespace-pre-wrap px-3">
            {asset.weaponActions.length > 0
              ? asset.weaponActions.map((special) => (
                  <div className="pl-2">
                    {special.split(": ").length === 2
                      ? special.split(": ").map((token, index) => {
                          if (index === 0)
                            return <div className="pl-2">{token}</div>;
                          return <div>{token}</div>;
                        })
                      : special}
                  </div>
                ))
              : "-"}
          </div>
        </div>
        <hr />

        <div className="py-3">
          <div className="w-36 px-3 pb-3">무기 스킬</div>
          <div className="flex flex-col gap-3 whitespace-pre-wrap px-3">
            {asset.special.length > 0
              ? asset.special.map((special) => (
                  <div>
                    {special.split(": ").length === 2
                      ? special.split(": ").map((token, index) => {
                          if (index === 0)
                            return <div className="pl-2">{token}</div>;
                          return <div>{token}</div>;
                        })
                      : special}
                  </div>
                ))
              : "-"}
          </div>
        </div>
      </div>

      {asset.info !== "-" && (
        <div className="text-white w-96 leading-relaxed whitespace-pre-wrap">
          {" " + asset.info}
        </div>
      )}

      {asset?.comment !== "" && (
        <>
          <div className="text-white w-96 leading-relaxed whitespace-pre-wrap flex flex-col gap-5">
            <h4 className="text-xl">추가 정보</h4>
            <div>{" " + asset.comment.replace(". ", ". \n")}</div>
          </div>
          <hr />
        </>
      )}

      {asset.howToGet !== "" && (
        <div className="text-white w-96 leading-relaxed whitespace-pre-wrap flex flex-col gap-5">
          <h4 className="text-xl mb-3">입수 방법</h4>
          <div>{" " + asset.howToGet.replace(". ", ". \n")}</div>
        </div>
      )}
    </>
  );
}
