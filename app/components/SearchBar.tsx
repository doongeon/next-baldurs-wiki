import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  searchQeury: string;
};

interface SearchBarProps {
  setSearchQuery: (searchQuery: string) => void;
}

export default function SearchBar({ setSearchQuery }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = ({ searchQeury }) => {};

  useEffect(() => {
    setSearchQuery(watch("searchQeury"));
  }, [watch("searchQeury")]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="text-black w-96"
        {...register("searchQeury", {
          required: true,
        })}
        autoComplete="off"
      />
    </form>
  );
}
