"use client";

import Link from "next/link";

export default function Title() {
  return (
    <div className="w-full max-w-screen-sm">
      <Link href={"/"}>
        <h1 className="text-7xl font-bold">BG3 DICT</h1>
      </Link>
      <h2 className="text-1xl bg-red-600 rounded-xl w-20 text-center place-content-center my-2 ml-3">
        BETA
      </h2>
    </div>
  );
}
