"use client";
import React from "react";
import DateRangePicker from "./DateRangePicker";
import { Button } from "../ui/Button";
import PriceRangeInput from "./PriceRangeInput";
import { Label } from "../ui/Label";
import { FaArrowRight } from "react-icons/fa";
import SearchLocation from "./SearchLocation";
import { useForm } from "react-hook-form";
import { FormValues } from "@/types/searchAndFilter";

const FilterAndSearch = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      location: "",
      date: {
        from: new Date(),
        to: new Date(),
      },
      price: {
        from: 1000,
        to: 1000000,
      },
    },
    mode: "onChange",
  });
  const onSubmit = (data: FormValues) => {
    console.log({ data });
  };

  return (
    <div className="bg-[#0F0F0F] content-wrapper bg-opacity-[60%] py-[30px] px-6 rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-12 md:items-end justify-between"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-1">
          <SearchLocation control={control} name="location" />
          <DateRangePicker control={control} name="date" />
          <PriceRangeInput control={control} name="price" />
        </div>
        <Button
          variant="default"
          type="submit"
          className="flex items-center gap-2 h-14 justify-self-end px-8"
        >
          <Label className="font-bold text-white text-base">Find trips</Label>
          <FaArrowRight className="w-12 h-5 flex-shrink-0" />
        </Button>
      </form>
    </div>
  );
};

export default FilterAndSearch;
