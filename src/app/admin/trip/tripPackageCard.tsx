import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { TripPackage } from "@/types/tripPackage";

type TripPackageCardProps = {
  pkg: TripPackage;
  idx: number;
  packageOptions: string[];
  toggleOption: (pkgId: number, option: string) => void;
  updateNewOption: (pkgId: number, value: string) => void;
  addCustomOption: (pkgId: number) => void;
  removeCustomOption: (pkgId: number, option: string) => void;
  removeTripPackage: (pkgId: number) => void;
};

const TripPackageCard: React.FC<TripPackageCardProps> = ({
  pkg,
  idx,
  packageOptions,
  toggleOption,
  updateNewOption,
  addCustomOption,
  removeCustomOption,
  removeTripPackage,
}) => {
  return (
    <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm relative">
      <Button
        type="button"
        onClick={() => removeTripPackage(pkg.id)}
        className="absolute top-2 right-2 text-red-500"
        variant="ghost"
        size="icon"
        aria-label="Remove package"
      >
        &times;
      </Button>
      <div className="mb-2 font-semibold text-sm">Trip Package {idx + 1}</div>
      <div className="flex flex-wrap gap-2 border rounded-md p-2 items-center bg-white">
        {packageOptions.map((option) => (
          <Badge
            key={option}
            variant={
              pkg.selectedOptions.includes(option) ? "secondary" : "outline"
            }
            className={pkg.selectedOptions.includes(option) ? "font-bold" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => toggleOption(pkg.id, option)}
          >
            {option}
          </Badge>
        ))}
        {pkg.customOptions.map((option) => (
          <div key={option} className="relative inline-flex">
            <Badge
              variant={
                pkg.selectedOptions.includes(option) ? "secondary" : "outline"
              }
              className={
                pkg.selectedOptions.includes(option) ? "font-bold pr-6" : "pr-6"
              }
              style={{ cursor: "pointer" }}
              onClick={() => toggleOption(pkg.id, option)}
            >
              {option}
            </Badge>
            <button
              type="button"
              onClick={() => removeCustomOption(pkg.id, option)}
              className="absolute right-0 top-0 text-xs text-red-500 px-1 focus:outline-none"
              aria-label={`Remove ${option}`}
              tabIndex={-1}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Input
          value={pkg.newOption}
          onChange={(e) => updateNewOption(pkg.id, e.target.value)}
          placeholder="Add option"
          className="flex-1 h-8 text-sm border-gray-200"
        />
        <Button
          onClick={() => addCustomOption(pkg.id)}
          size="sm"
          variant="primary"
          type="button"
          className="h-8 px-3 text-sm"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TripPackageCard;
