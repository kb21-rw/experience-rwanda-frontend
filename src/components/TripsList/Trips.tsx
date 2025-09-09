"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Filter } from "lucide-react";
import FilterSidebar from "./FilterSider";
import { X } from "lucide-react";

const Trips = ({ tripsLength }: { tripsLength: number }) => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };
  return (
    <div>
      <div className="lg:hidden sticky top-0 z-40 bg-site border-b border-gray-700 p-4">
        <Button
          onClick={toggleMobileFilter}
          variant="outline"
          className="flex items-center gap-2 bg-site-primary text-white border-site-secondary hover:bg-site-secondary"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {showMobileFilter && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="absolute inset-0" onClick={toggleMobileFilter} />

          <div
            className={`
        absolute bottom-0 left-0 right-0 
        bg-site-primary rounded-t-3xl 
        transform transition-transform duration-300 ease-out
        ${showMobileFilter ? "translate-y-0" : "translate-y-full"}
        max-h-[85vh] overflow-hidden
      `}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
            </div>

            <div className="absolute top-4 right-6 z-10">
              <button
                onClick={toggleMobileFilter}
                className="text-white hover:text-site-secondary transition-colors p-1"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(85vh-60px)]">
              <FilterSidebar
                tripsCount={tripsLength}
                className="rounded-t-3xl border-0"
                onClose={toggleMobileFilter}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trips;
