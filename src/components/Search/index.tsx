"use client";
import { Input } from "@/components/ui/Input";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

type SearchProps = {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
};

const Search = ({ onSearch, className, placeholder }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        className={`pl-10 h-12 ${className}`}
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
