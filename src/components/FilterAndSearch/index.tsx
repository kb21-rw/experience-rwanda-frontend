import DateRangePicker from "./DateRangePicker";
import { Button } from "../ui/Button";
import PriceRangeInput from "./PriceRangeInput";
import { Label } from "@/components/ui/Label";
import { FaArrowRight } from "react-icons/fa";
import SearchLocation from "./SearchLocation";
import { Form } from "../ui/Form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { searchSchema } from "../../utils/schemas/searchSchema";
import { z } from "zod";

type InputProps = {
  form: UseFormReturn<z.infer<typeof searchSchema>>;
  onSubmit: SubmitHandler<z.infer<typeof searchSchema>>;
};

const FilterAndSearch = ({ form, onSubmit }: InputProps) => {
  return (
    <Form {...form}>
      <div className="bg-gray-850 bg-opacity-[60%] my-25 py-7.5 md:py-0 px-6 rounded-2xl">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-12 md:items-center justify-between"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-1 ">
            <SearchLocation form={form} />
            <PriceRangeInput form={form} />
            <DateRangePicker form={form} />
          </div>
          <Button
            type="submit"
            variant="default"
            className="flex items-center gap-2 h-14 justify-self-end px-8 md:mt-7.5"
          >
            <Label className="font-bold text-white text-base">Find trips</Label>
            <FaArrowRight className="w-12 h-5 flex-shrink-0" />
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default FilterAndSearch;
