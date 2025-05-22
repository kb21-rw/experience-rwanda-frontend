import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import React from "react";

type MealPackage = {
  id: number;
  selectedMeals: string[];
  customMeals: string[];
  newMeal: string;
};

type MealPackageCardProps = {
  pkg: MealPackage;
  idx: number;
  mealOptions: string[];
  toggleMeal: (pkgId: number, meal: string) => void;
  updateNewMeal: (pkgId: number, value: string) => void;
  addCustomMeal: (pkgId: number) => void;
  removeCustomMeal: (pkgId: number, meal: string) => void;
  removeMealPackage: (pkgId: number) => void;
};

const MealPackageCard: React.FC<MealPackageCardProps> = ({
  pkg,
  idx,
  mealOptions,
  toggleMeal,
  updateNewMeal,
  addCustomMeal,
  removeCustomMeal,
  removeMealPackage,
}) => {
  return (
    <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm relative">
      <Button
        type="button"
        onClick={() => removeMealPackage(pkg.id)}
        className="absolute top-3 right-3 text-red-500"
        variant="ghost"
        size="icon"
        aria-label="Remove package"
      >
        &times;
      </Button>
      <div className="mb-2 font-semibold">Meal Package {idx + 1}</div>
      <div className="flex flex-wrap gap-2 border rounded-md p-3 items-center bg-white">
        {mealOptions.map((meal) => (
          <Badge
            key={meal}
            variant={pkg.selectedMeals.includes(meal) ? "secondary" : "outline"}
            className={pkg.selectedMeals.includes(meal) ? "font-bold" : ""}
            style={{ cursor: "pointer" }}
            onClick={() => toggleMeal(pkg.id, meal)}
          >
            {meal}
          </Badge>
        ))}
        {pkg.customMeals.map((meal) => (
          <div key={meal} className="relative inline-flex">
            <Badge
              variant={pkg.selectedMeals.includes(meal) ? "secondary" : "outline"}
              className={pkg.selectedMeals.includes(meal) ? "font-bold pr-6" : "pr-6"}
              style={{ cursor: "pointer" }}
              onClick={() => toggleMeal(pkg.id, meal)}
            >
              {meal}
            </Badge>
            <button
              type="button"
              onClick={() => removeCustomMeal(pkg.id, meal)}
              className="absolute right-0 top-0 text-xs text-red-500 px-1 focus:outline-none"
              aria-label={`Remove ${meal}`}
              tabIndex={-1}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-md">
        <Input
          value={pkg.newMeal}
          onChange={e => updateNewMeal(pkg.id, e.target.value)}
          placeholder="Add custom meal"
          className="flex-1 border-none bg-transparent focus:ring-0 focus:border-none shadow-none text-sm"
        />
        <Button
          onClick={() => addCustomMeal(pkg.id)}
          size="sm"
          variant="primary"
          type="button"
          className="ml-2 px-4 py-2 text-sm"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default MealPackageCard; 