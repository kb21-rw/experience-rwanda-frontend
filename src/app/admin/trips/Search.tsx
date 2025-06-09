"use client";
import { Input } from "@/components/ui/Input";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

type SearchProps = { onSearch: (query: string) => void; className?: string };

const Search = ({ onSearch, className }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={`relative flex flex-1 text-gray-500 ${className}`}>
      <SearchIcon className="absolute top-4 left-3 w-5 h-5" />
      <Input
        type="text"
        placeholder="Search Trips"
        className="xl:w-150 md:w-80 w-40 pl-16"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
