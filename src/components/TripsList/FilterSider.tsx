"use client";

import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/SideBar/separator';
import { Slider } from '../ui/Slider/Slider';
import { Button } from '../ui/Button';

interface FilterCategory {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface FilterSidebarProps {
  className?: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ className }) => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState([100, 500]);
  
  const [categories, setCategories] = useState<FilterCategory[]>([
    { id: 'national-parks', label: 'National Parks', count: 7, checked: false },
    { id: 'culture-heritage', label: 'Culture & Heritage', count: 3, checked: true },
    { id: 'historical', label: 'Historical', count: 9, checked: true },
    { id: 'religious', label: 'Religious', count: 1, checked: false },
    { id: 'hiking', label: 'Hiking', count: 49, checked: false },
    { id: 'city-experiences', label: 'City Experiences', count: 48, checked: false },
    { id: 'waterfalls', label: 'Waterfalls', count: 47, checked: false },
  ]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, checked } : cat
      )
    );
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  return (
    <div className={cn(
      "w-64 bg-site-primary text-white p-6 space-y-6",
      className
    )}>
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
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id}
                    checked={category.checked}
                    onCheckedChange={(checked: boolean) => 
                      handleCategoryChange(category.id, checked as boolean)
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

      <Separator className="bg-gray-600" />

      <div className="space-y-4">
        <button
          onClick={() => setPriceExpanded(!priceExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-sm font-medium uppercase tracking-wide">
            Price
          </h3>
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
            
            <div className="text-sm text-gray-300">
              38 trips found
            </div>
          </div>
        )}
      </div>

     <div className="flex flex-col space-y-4">
       <Button className="w-full">Past Trips</Button>
       <Button className="w-full">Reset Filters</Button>
     </div>
    </div>
  );
};

export default FilterSidebar;