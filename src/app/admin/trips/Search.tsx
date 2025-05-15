"use client";
import { Input } from "@/components/ui/Input";
import { Search as SearchIcon } from "lucide-react";
export default function Search() {
  return (
    <div>
      <div className="relative flex flex-1 gap-5">
        <Input placeholder="Search Trips" className="w-150" />
        <SearchIcon className="absolute top-4 left-3 w-5 h-5" />
      </div>
    </div>
  );
}
