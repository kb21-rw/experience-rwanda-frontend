"use client"

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { FaCloudUploadAlt} from "react-icons/fa";
import { useState } from "react";
import TripPackageCard from "./TripPackageCard";

type TripPackage = {
  id: number;
  selectedOptions: string[];
  customOptions: string[];
  newOption: string;
}

const CreateTrip = () => {
  // Dynamic trip packages state
  const [tripPackages, setTripPackages] = useState<TripPackage[]>([
    { id: 1, selectedOptions: [], customOptions: [], newOption: '' },
  ]);

  const addTripPackage = () => {
    setTripPackages([
      ...tripPackages,
      { id: Date.now(), selectedOptions: [], customOptions: [], newOption: '' },
    ]);
  };

  const removeTripPackage = (id: number) => {
    setTripPackages(tripPackages.filter((pkg) => pkg.id !== id));
  };

  const toggleOption = (pkgId: number, option: string) => {
    setTripPackages((tripPackages) =>
      tripPackages.map((pkg) =>
        pkg.id === pkgId
          ? {
              ...pkg,
              selectedOptions: pkg.selectedOptions.includes(option)
                ? pkg.selectedOptions.filter((o) => o !== option)
                : [...pkg.selectedOptions, option],
            }
          : pkg
      )
    );
  };

  const updateNewOption = (pkgId: number, value: string) => {
    setTripPackages((tripPackages) =>
      tripPackages.map((pkg) =>
        pkg.id === pkgId ? { ...pkg, newOption: value } : pkg
      )
    );
  };

  const addCustomOption = (pkgId: number) => {
    setTripPackages((tripPackages) =>
      tripPackages.map((pkg) => {
        if (pkg.id === pkgId && pkg.newOption.trim() && !pkg.customOptions.includes(pkg.newOption.trim())) {
          return {
            ...pkg,
            customOptions: [...pkg.customOptions, pkg.newOption.trim()],
            newOption: '',
          };
        }
        return pkg;
      })
    );
  };

  const removeCustomOption = (pkgId: number, option: string) => {
    setTripPackages((tripPackages) =>
      tripPackages.map((pkg) =>
        pkg.id === pkgId
          ? {
              ...pkg,
              customOptions: pkg.customOptions.filter((optionName) => optionName !== option),
              selectedOptions: pkg.selectedOptions.filter((optionName) => optionName !== option),
            }
          : pkg
      )
    );
  };

  return (
    <div className=" p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trips | New Trip
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-black mb-2"
            >
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Hike with vibes at Muhabura volcano"
              className="w-96 px-3 py-2 border border-black rounded-md "
            />
          </div>

          <div>
            <Label
              htmlFor="location"
              className="block text-sm font-medium text-black mb-2"
            >
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Musanze district"
              className="w-96 px-3 py-2 border border-black rounded-md "
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-black mb-2"
            >
              Description
            </Label>
            <textarea
              id="description"
              rows={4}
              className="w-96 px-3 py-2 border border-black rounded-md  "
              placeholder="Enter trip description..."
            />
          </div>

          <div>
            <Label className="block text-lg font-bold text-black mb-4">
              Gallery
            </Label>
            <div className="flex gap-12">
              <div className="w-36 h-36 border border-white bg-white shadow-2xl rounded-md">
                <FaCloudUploadAlt className="mx-auto h-12 w-12 mt-5" />
                <p className="text-sm text-black font-inter text-center p-3">
                  Upload Cover photo or drag it here
                </p>
              </div>

              <div className="w-36 h-36 border border-white bg-white shadow-2xl rounded-md">
                <FaCloudUploadAlt className=" h-12 w-12 mx-auto mt-5" />
                <p className="text-sm text-black font-inter text-center p-3">
                  Upload gallery photo or drag it here
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label
                htmlFor="date"
                className="block text-sm font-medium text-black mb-2"
              >
                Date
              </Label>
              <Input
                type="date"
                defaultValue="2025-07-12"
                className="w-32 p-2 border border-black rounded-md"
              />
            </div>
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-black mb-2"
              >
                Price
              </Label>
              <Input
                id="price"
                type="text"
                placeholder="30$ / day"
                className="w-32 p-2 text-black border border-black rounded-md "
              />
            </div>
            <div>
              <Label
                htmlFor="seats"
                className="block text-sm font-medium text-black mb-2"
              >
                Seats
              </Label>
              <Input
                id="seats"
                type="number"
                placeholder="60 seats"
                className="w-32 p-2 border text-black border-black rounded-md"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-6">
              Trip Packages
            </h3>

            {tripPackages.map((pkg, idx) => (
              <TripPackageCard
                key={pkg.id}
                pkg={pkg}
                idx={idx}
                packageOptions={[]}
                toggleOption={toggleOption}
                updateNewOption={updateNewOption}
                addCustomOption={addCustomOption}
                removeCustomOption={removeCustomOption}
                removeTripPackage={removeTripPackage}
              />
            ))}
            <Button
              type="button"
              onClick={addTripPackage}
              className="mt-2 px-4 py-2 bg-black text-white rounded"
              variant="primary"
            >
              Add trip package
            </Button>
          </div>

          <div className="pt-20">
            <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Create New Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
