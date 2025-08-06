import { Loader } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Loader className="w-16 h-16 animate-spin" />
    </div>
  );
};

export default Spinner;
