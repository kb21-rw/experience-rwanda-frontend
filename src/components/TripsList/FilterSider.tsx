"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/SideBar/separator";
import { Slider } from "../ui/Slider/Slider";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterCategory {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface FilterSidebarProps {
  className?: string;
  tripsCount: number;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  className,
  tripsCount,
  onClose,
}) => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState([100, 500]);

  const [categories, setCategories] = useState<FilterCategory[]>([
    { id: "national-parks", label: "National Parks", count: 7, checked: false },
    {
      id: "culture-heritage",
      label: "Culture & Heritage",
      count: 3,
      checked: true,
    },
    { id: "historical", label: "Historical", count: 9, checked: true },
    { id: "religious", label: "Religious", count: 1, checked: false },
    { id: "hiking", label: "Hiking", count: 49, checked: false },
    {
      id: "city-experiences",
      label: "City Experiences",
      count: 48,
      checked: false,
    },
    { id: "waterfalls", label: "Waterfalls", count: 47, checked: false },
  ]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === categoryId ? { ...cat, checked } : cat))
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  return (
    <div
      className={cn(
        "w-full lg:w-64 bg-site-primary text-white space-y-6",
        className
      )}
    >
      <div className="lg:hidden mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setCategoriesExpanded(!categoriesExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium uppercase tracking-wide">
            Filter by Categories
          </h3>
          {categoriesExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {categoriesExpanded && (
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={category.checked}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked === true)
                    }
                    className="border-gray-400 data-[state=checked]:bg-site-secondary data-[state=checked]:border-site-secondary"
                  />
                  <label
                    htmlFor={category.id}
                    className="text-sm text-white cursor-pointer"
                  >
                    {category.label}
                  </label>
                </div>
                <span className="text-sm text-gray-300 ml-2">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="bg-gray-200" />

      <div className="space-y-4">
        <button
          onClick={() => setPriceExpanded(!priceExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium uppercase tracking-wide">Price</h3>
          {priceExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {priceExpanded && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Rwf {priceRange[0]}</span>
              <span>—</span>
              <span>Rwf {priceRange[1]}</span>
            </div>

            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={500}
              min={100}
              step={10}
              className="w-full"
            />

            <div className="text-sm text-gray-200">
              {tripsCount} trips found
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 space-y-3">
        <Button variant="default" className="w-full">
          Past trips
        </Button>

        {onClose && (
          <Button
            variant="outline"
            className="w-full lg:hidden border-site-secondary text-site-secondary hover:bg-site-secondary hover:text-white"
            onClick={onClose}
          >
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
