"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { inputFocusState, searchQueryState } from "../Atom";

type Input = {
  searchQeury: string;
};

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [inputFocus, setInputFocus] = useRecoilState(inputFocusState);
  const setSearchQuery = useSetRecoilState(searchQueryState);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    setSearchQuery(watch("searchQeury"));
  }, [watch("searchQeury")]);

  const onSubmit: SubmitHandler<Input> = ({ searchQeury }) => {
    (document.activeElement as HTMLElement).blur();
    setInputFocus(false);
    router.push(`/?searchQuery=${searchQeury}`);
  };

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={inputRef}
        className="text-black w-96"
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
