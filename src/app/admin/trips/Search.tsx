"use client";
import { Input } from "@/components/ui/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
  return (
    <div>
      <div className="relative flex flex-1 gap-5">
        <Input placeholder="Search Trips" className="w-150" />
        <MagnifyingGlassIcon className="absolute left-5 w-5 h-5 top-4" />
      </div>
    </div>
  );
}
