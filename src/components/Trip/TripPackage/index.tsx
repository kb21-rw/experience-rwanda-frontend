/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/Button";
import type { TripPackage } from "@/types/tripPackage";
import TripPackageCard from "./TripPackageCard";

const TripPackage = ({
  setTripPackages,
  tripPackages,
}: {
  setTripPackages: Dispatch<SetStateAction<TripPackage[]>>;
  tripPackages: TripPackage[];
}) => {
  const addTripPackage = () => {
    setTripPackages([
      ...tripPackages,
      { id: Date.now(), selectedOptions: [], customOptions: [], newOption: "" },
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
        if (
          pkg.id === pkgId &&
          pkg.newOption.trim() &&
          !pkg.customOptions.includes(pkg.newOption.trim())
        ) {
          return {
            ...pkg,
            customOptions: [...pkg.customOptions, pkg.newOption.trim()],
            newOption: "",
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
              customOptions: pkg.customOptions.filter(
                (optionName) => optionName !== option
              ),
              selectedOptions: pkg.selectedOptions.filter(
                (optionName) => optionName !== option
              ),
            }
          : pkg
      )
    );
  };
  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-6">Trip Packages</h3>

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
  );
};

export default TripPackage;
