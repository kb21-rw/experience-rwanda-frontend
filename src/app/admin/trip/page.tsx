"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
// import { Button } from "@/components/ui/Button";
import { FaCloudUploadAlt } from "react-icons/fa";
// import { useState } from "react";
import TripPackageCard from "./tripPackageCard";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type TripPackage = {
  id: number;
  selectedOptions: string[];
  customOptions: string[];
  newOption: string;
};
const CreateTrip = () => {
  const [tripPackages, setTripPackages] = useState<TripPackage[]>([
    { id: 1, selectedOptions: [], customOptions: [], newOption: "" },
  ]);

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

  // upload the main picture and the gallery pictures

  /// use the react hook form to get data
  const { register, handleSubmit, control } = useForm();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryImageNames, setGalleryImageNames] = useState<string[]>([]);
  const [mainImageName, setMainImageName] = useState<string | null>(null);

  const handleMainImageChange = (file: File | null) => {
    if (file) setMainImage(file);
    setMainImageName(file ? file.name : null);
  };
  const {
    fields: pricingOptions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pricingOptions",
  });

  const onGalleryImagesChange = (files: FileList | null) => {
    handleGalleryImagesChange(files);
    if (files) {
      const names = Array.from(files).map((file) => file.name);

      setGalleryImageNames((prev) => [...prev, ...names]); // <- This REPLACES the previous list
    } else {
      setGalleryImageNames([]);
    }
  };
  const handleGalleryImagesChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    setGalleryImages((prev) => [...prev, ...newFiles]);
  };

  const onSubmit = async (data: unknown) => {
    console.log(data);
    const formData = new FormData();

    // Append text fields
    formData.append("createTrip", JSON.stringify(data));
    if (mainImage) {
      formData.append("mainPicture", mainImage);
    }

    galleryImages?.forEach((file) => {
      formData.append("pictures", file);
    });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error uploading:", error);
    }
    console.log(formData, "=====");
  };

  console.log({ galleryImageNames });

  return (
    <div className=" p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trips | New Trip
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
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
              {...register("title")}
              placeholder="Hike with vibes at Muhabura volcano"
              className="w-full px-3 py-2 border border-black rounded-md "
            />
          </div>

          <div>
            <Label
              htmlFor="destination"
              className="block text-sm font-medium text-black mb-2"
            >
              Destination
            </Label>
            <Input
              id="location"
              type="text"
              {...register("destination")}
              placeholder="Musanze district"
              className="w-full px-3 py-2 border border-black rounded-md "
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
              {...register("description")}
              rows={4}
              className="w-full px-3 py-2 border border-black rounded-md  "
              placeholder="Enter trip description..."
            />
          </div>

          <div>
            <Label className="block text-2xl font-bold text-black mb-6">
              Gallery
            </Label>
            <div className="flex gap-12">
              {/* Cover Photo Upload */}
              <div className="flex flex-col items-center">
                <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleMainImageChange(e.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                  <FaCloudUploadAlt className="w-14 h-14 text-blue-600 mb-2" />
                  <p className="text-center text-base text-black font-medium px-2">
                    Upload Cover photo
                    <br />
                    or drag it here
                  </p>
                </label>
                {mainImageName && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {mainImageName}
                  </p>
                )}
              </div>

              {/* Gallery Photo Upload */}
              <div className="flex flex-col items-center">
                <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onGalleryImagesChange(e.target.files)}
                    className="hidden"
                  />
                  <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
                  <p className="text-center text-base text-black font-medium px-2">
                    Upload gallery photo
                    <br />
                    or drag it here
                  </p>
                </label>
                {galleryImageNames.length > 0 && (
                  <ul className="mt-2 text-sm text-gray-600 text-center space-y-1">
                    {galleryImageNames.map((name, idx) => (
                      <li key={idx}>{name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label
                htmlFor="departureTime"
                className="block text-sm font-medium text-black mb-2"
              >
                Departure Time
              </Label>
              <Input
                type="date"
                {...register("departureTime")}
                defaultValue="2025-07-12"
                className="w-32 p-2 border border-black rounded-md"
              />
            </div>
            <div>
              <Label
                htmlFor="returnTime"
                className="block text-sm font-medium text-black mb-2"
              >
                Return Time
              </Label>
              <Input
                type="date"
                {...register("returnTime")}
                defaultValue="2025-07-12"
                className="w-32 p-2 border border-black rounded-md"
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
                {...register("seats")}
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
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-black mb-4">
              Pricing Options
            </h3>

            {pricingOptions.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-300 p-4 rounded-md mb-4"
              >
                <div className="mb-2">
                  <Label className="block text-sm text-black mb-1">Name</Label>
                  <Input
                    type="text"
                    {...register(`pricingOptions.${index}.name`)}
                    className="w-full p-2 border border-black rounded-md"
                    placeholder="Option name"
                  />
                </div>

                <div className="mb-2">
                  <Label className="block text-sm text-black mb-1">
                    Amount
                  </Label>
                  <Input
                    type="number"
                    {...register(`pricingOptions.${index}.amount`)}
                    className="w-full p-2 border border-black rounded-md"
                    placeholder="Amount in $"
                  />
                </div>

                <div className="mb-2">
                  <Label className="block text-sm text-black mb-1">
                    Description
                  </Label>
                  <textarea
                    {...register(`pricingOptions.${index}.description`)}
                    className="w-full p-2 border border-black rounded-md"
                    placeholder="Short description"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 text-sm hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ name: "", price: "", description: "" })}
              className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Add Pricing Option
            </button>
          </div>

          <div className="pt-20">
            <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Create New Trip
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTrip;
