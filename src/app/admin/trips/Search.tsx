"use client";
import { Input } from "@/components/ui/Input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <div>
      <div className="relative flex flex-1 text-gray-500">
        <SearchIcon className="absolute top-4 left-3 w-5 h-5" />
        <Input placeholder="Search Trips" className="w-150 pl-16" />
      </div>
    </div>
  );
};

export default Search;
