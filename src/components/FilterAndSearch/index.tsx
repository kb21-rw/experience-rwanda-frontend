import React from "react";
import DateRangePicker from "./DateRangePicker";
import { Button } from "../ui/Button";
import PriceRangeInput from "./PriceRangeInput";
import { Label } from "../ui/Label";
import { FaArrowRight } from "react-icons/fa";
import SearchLocation from "./SearchLocation";
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
// import { FormValues } from "@/types/searchAndFilter";
import { SearchFormData } from "./searchSchema";
import { FormValues } from "@/types/searchAndFilter";

type FilterAndSearchProps = {
  watch: UseFormWatch<SearchFormData>;
  setValue: UseFormSetValue<SearchFormData>;
  onSubmit: SubmitHandler<SearchFormData>;
  handleSubmit: UseFormHandleSubmit<SearchFormData, SearchFormData>;
  errors: FieldErrors<FormValues>;
};

const FilterAndSearch = ({
  watch,
  setValue,
  onSubmit,
  handleSubmit,
  errors,
}: FilterAndSearchProps) => {
  return (
    <div className="bg-[#0F0F0F] bg-opacity-[60%] my-25 py-[30px] md:py-0 px-6 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-12 md:items-center justify-between"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-1">
          <SearchLocation watch={watch} setValue={setValue} errors={errors} />
          <PriceRangeInput setValue={setValue} errors={errors} />
          <DateRangePicker watch={watch} setValue={setValue} errors={errors} />
        </div>
        <Button
          variant="default"
          className="flex items-center gap-2 h-14 justify-self-end px-8 md:mt-[30px]"
        >
          <Label className="font-bold text-white text-base">Find trips</Label>
          <FaArrowRight className="w-12 h-5 flex-shrink-0" />
        </Button>
      </form>
    </div>
  );
};

export default FilterAndSearch;
