"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Search as SearchIcon} from "lucide-react";

interface TripSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const TripSearchBar = ({ 
  onSearch, 
  placeholder = "Search by title or location", 
  className = "" 
}: TripSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative -mt-1">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyPress}
          aria-label="Search trips"
          className="pl-14 pr-12 md:pr-20 h-11 md:h-12 w-full text-base bg-[#0F1F2A] text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 shadow-none"
        />
      </div>
    </div>
  );
};

export default TripSearchBar;
