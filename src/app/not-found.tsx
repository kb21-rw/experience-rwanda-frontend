import { Button } from "@/components/ui/Button";
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex bg-site text-white flex-col items-center gap-16 justify-center h-screen">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="font-bold text-3xl md:text-5xl lg:text-5.8xl leading-none font-Figtree">
          Ooops !
        </h1>
        <p className="text-base font-normal font-inter">
          The page you are looking for, is not found.
        </p>
      </div>
      <Link href="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
