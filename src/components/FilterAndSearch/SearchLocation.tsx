import React, { Dispatch, SetStateAction } from "react";
import InputLabel from "./InputLabel";
import { Input } from "../ui/Input";
import { MapPin } from "lucide-react";

const SearchLocation = ({
  location,
  setLocation,
}: {
  location?: string;
  setLocation: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col w-full max-w-sm gap-1.5">
      <InputLabel label="Location" />
      <div className="w-full flex items-center bg-white text-black border border-gray-300 rounded-md h-14 px-2">
        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
        <div className="flex-1 w-full h-full ">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            placeholder="Search locations"
            className="bg-transparent outline-none text-black border-none w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchLocation;
