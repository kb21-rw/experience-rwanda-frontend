import DateRangePicker from "./DateRangePicker";
import { Button } from "../ui/Button";
import PriceRangeInput from "./PriceRangeInput";
import { Label } from "@/components/ui/Label";
import { FaArrowRight } from "react-icons/fa";
import SearchLocation from "./SearchLocation";
import { Form } from "../ui/form";

const FilterAndSearch = ({ searchForm, onSubmit }: any) => {
  return (
    <Form {...searchForm}>
      <div className="bg-[#0F0F0F] bg-opacity-[60%] my-25 py-[30px] md:py-0 px-6 rounded-2xl">
        <form
          onSubmit={searchForm.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-12 md:items-center justify-between"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between flex-1 ">
            <SearchLocation searchForm={searchForm} />
            <PriceRangeInput searchForm={searchForm} />
            <DateRangePicker searchForm={searchForm} />
          </div>
          <Button
            type="submit"
            variant="default"
            className="flex items-center gap-2 h-14 justify-self-end px-8 md:mt-[30px]"
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
