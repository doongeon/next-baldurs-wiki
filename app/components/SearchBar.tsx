"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { autoCompeleteViewState, searchQueryState } from "../Atom";

type Input = {
  searchQeury: string;
};

export default function SearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  const setAutoCompleteView = useSetRecoilState(autoCompeleteViewState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    if (!params.get("searchQuery")) setValue("searchQeury", "");
  }, [params]);

  useEffect(() => {
    setSearchQuery(watch("searchQeury"));
  }, [watch("searchQeury")]);

  const onSubmit: SubmitHandler<Input> = ({ searchQeury }) => {
    (document.activeElement as HTMLElement).blur();
    setAutoCompleteView(false);
    setSearchQuery("");
    router.push(`/?searchQuery=${searchQeury}`);
  };

  const handleFocus = () => {
    setAutoCompleteView(true);
    setSearchQuery(watch("searchQeury"));
  };

  const handleBlur = () => {
    setTimeout(() => setAutoCompleteView(false), 300);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="text-black w-80"
        {...register("searchQeury", {
          required: true,
        })}
        autoComplete="off"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type="submit">돋보기</button>
    </form>
  );
}
