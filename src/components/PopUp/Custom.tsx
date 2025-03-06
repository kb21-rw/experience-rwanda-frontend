"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

type CustomPopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

const CustomPopup: React.FC<CustomPopupProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <span></span>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4 border border-gray-300 rounded-md bg-white shadow-md">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopup;
