"use client"

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { FaCloudUploadAlt} from "react-icons/fa";
import { useState } from "react";
import MealPackageCard from "./MealPackageCard";

const mealOptions = ["Breakfast", "Dinner", "Lunch", "Juices"];

type MealPackage = {
  id: number;
  selectedMeals: string[];
  customMeals: string[];
  newMeal: string;
}

const CreateTrip = () => {
  // Dynamic meal packages state
  const [mealPackages, setMealPackages] = useState<MealPackage[]>([
    { id: 1, selectedMeals: [], customMeals: [], newMeal: '' },
  ]);

  const addMealPackage = () => {
    setMealPackages([
      ...mealPackages,
      { id: Date.now(), selectedMeals: [], customMeals: [], newMeal: '' },
    ]);
  };

  const removeMealPackage = (id: number) => {
    setMealPackages(mealPackages.filter((pkg) => pkg.id !== id));
  };

  const toggleMeal = (pkgId: number, meal: string) => {
    setMealPackages((mealPackages) =>
      mealPackages.map((pkg) =>
        pkg.id === pkgId
          ? {
              ...pkg,
              selectedMeals: pkg.selectedMeals.includes(meal)
                ? pkg.selectedMeals.filter((m) => m !== meal)
                : [...pkg.selectedMeals, meal],
            }
          : pkg
      )
    );
  };

  const updateNewMeal = (pkgId: number, value: string) => {
    setMealPackages((mealPackages) =>
      mealPackages.map((pkg) =>
        pkg.id === pkgId ? { ...pkg, newMeal: value } : pkg
      )
    );
  };

  const addCustomMeal = (pkgId: number) => {
    setMealPackages((mealPackages) =>
      mealPackages.map((pkg) => {
        if (pkg.id === pkgId && pkg.newMeal.trim() && ![...mealOptions, ...pkg.customMeals].includes(pkg.newMeal.trim())) {
          return {
            ...pkg,
            customMeals: [...pkg.customMeals, pkg.newMeal.trim()],
            newMeal: '',
          };
        }
        return pkg;
      })
    );
  };

  const removeCustomMeal = (pkgId: number, meal: string) => {
    setMealPackages((mealPackages) =>
      mealPackages.map((pkg) =>
        pkg.id === pkgId
          ? {
              ...pkg,
              customMeals: pkg.customMeals.filter((mealName) => mealName !== meal),
              selectedMeals: pkg.selectedMeals.filter((mealName) => mealName !== meal),
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

            {mealPackages.map((pkg, idx) => (
              <MealPackageCard
                key={pkg.id}
                pkg={pkg}
                idx={idx}
                mealOptions={mealOptions}
                toggleMeal={toggleMeal}
                updateNewMeal={updateNewMeal}
                addCustomMeal={addCustomMeal}
                removeCustomMeal={removeCustomMeal}
                removeMealPackage={removeMealPackage}
              />
            ))}
            <Button
              type="button"
              onClick={addMealPackage}
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
