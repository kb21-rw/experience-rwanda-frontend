"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import DateRangePicker from "./DateRangePicker";
import { Button } from "../ui/Button";
import PriceRangeInput from "./PriceRangeInput";
import { Label } from "../ui/Label";
import { FaArrowRight } from "react-icons/fa";
import SearchLocation from "./SearchLocation";
import { DateField, FormValues, PriceField } from "@/types/searchAndFilter";
import { SelectRangeEventHandler } from "react-day-picker";

const FilterAndSearch = ({
  filters,
  setFilters,
}: {
  filters: FormValues;
  setFilters: Dispatch<SetStateAction<FormValues>>;
}) => {
  const [date, setDate] = useState<DateField>({
    from: filters.date?.from,
    to: filters.date?.to,
  });
  const [price, setPrice] = useState<PriceField>({
    min: filters.price?.min,
    max: filters.price?.max,
  });
  const [location, setLocation] = useState<string>(filters.location);

  return (
    <div className="bg-[#0F0F0F] bg-opacity-[60%] py-[30px] my-25 px-6 rounded-2xl">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col md:flex-row gap-12 md:items-end justify-between"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-1">
          <SearchLocation location={location} setLocation={setLocation} />
          <PriceRangeInput price={price} setPrice={setPrice} />
          <DateRangePicker
            date={date}
            setDate={setDate as SelectRangeEventHandler}
          />
        </div>
        <Button
          variant="default"
          onClick={() => setFilters({ location, date, price })}
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
