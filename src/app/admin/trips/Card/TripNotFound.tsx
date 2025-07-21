import { TableCell, TableRow } from "@/components/ui/Table";
import { SearchIcon } from "lucide-react";
import React from "react";

const TripNotFound = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              No trips found
            </p>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TripNotFound;
