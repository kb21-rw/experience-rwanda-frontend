"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Search, Smile } from "lucide-react";

interface NoResultsProps {
  title: string;
  message: string;
  onClearSearch?: () => void;
}

const SearchNotFound = ({ title, message, onClearSearch }: NoResultsProps) => {
  return (
    <Card className="flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div>
        <Search className="w-16 h-16 text-gray-500" />
      </div>
      <h2 className="text-xl font-semibold text-gray-700">No trip found</h2>
      <p className="text-gray-500">{message}</p>

      <div className="flex gap-3 mt-4">
        <Button variant="default" onClick={onClearSearch}>
          <Smile className="w-4 h-4 mr-2" /> {title}
        </Button>
      </div>
    </Card>
  );
};
export default SearchNotFound;
