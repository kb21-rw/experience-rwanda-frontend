"use client";
import { Input } from "@/components/ui/Input";
import { Search as SearchIcon, X } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";

type SearchProps = {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
  showClearButton?: boolean;
};

const Search = ({ onSearch, className, placeholder, showClearButton = true }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClear = useCallback(() => {
    setSearchQuery("");
    onSearch("");
  }, [onSearch]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  }, [searchQuery, onSearch]);

  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        type="text"
        placeholder={placeholder}
        className={`pl-10 ${showClearButton && searchQuery ? 'pr-10' : ''} h-12`}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onSearch(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      {showClearButton && searchQuery && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
        >
          <X className="w-3 h-3 text-gray-500" />
        </Button>
      )}
    </div>
  );
};

export default Search;
