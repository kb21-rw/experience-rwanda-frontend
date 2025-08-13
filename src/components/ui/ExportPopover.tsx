import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "./Button";
import { IoShareSocial } from "react-icons/io5";
import { exportToPdf } from "@/lib/pdf/exportBookings";
import exportToCSV from "@/lib/exportToCSV";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

export function ExportPopover({
  data,
  headers,
  filename,
  title,
}: {
  data: { [key: string]: string }[];
  headers: string[];
  filename: string;
  title: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">
          <IoShareSocial /> Export
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => exportToPdf(data, headers, title, filename)}
            variant="outline"
            className="px-4 py-2"
          >
            <FaFilePdf />
            Export to PDF
          </Button>
          <Button
            onClick={() => exportToCSV(data, headers, filename)}
            variant="outline"
            className="px-4 py-2"
          >
            <FaFileCsv />
            Export to CSV
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
