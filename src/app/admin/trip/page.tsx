"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import TripPackageCard from "./tripPackageCard";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";

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

  const { register, handleSubmit, control, reset } = useForm();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleMainImageChange = (file: File | null) => {
    if (!file) return;
    setMainImage(file);
    const preview = URL.createObjectURL(file);
    setMainImagePreview(preview);
  };

  const handleGalleryImagesChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setGalleryImages(prev => [...prev, ...newFiles]);
    
    // Create previews for new images
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
    setGalleryPreviews(prev => [...prev, ...newPreviews]);
  };

  const deleteMainImage = () => {
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setMainImage(null);
    setMainImagePreview(null);
  };

  const deleteGalleryImage = (index: number) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(galleryPreviews[index]);
    
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const {
    fields: pricingOptions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pricingOptions",
  });

  const onSubmit = async (data: unknown) => {
    console.log(data);
    const formData = new FormData();

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
      reset();
      console.log(result);
      toast.success("🎉 Trip was created succesfully", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Error creating trip", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

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
              <div className="flex flex-col items-center">
                <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMainImageChange(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
                  <p className="text-center text-base text-black font-medium px-2">
                    Upload Cover photo
                    <br />
                    or drag it here
                  </p>
                </label>
              </div>

              <div className="flex flex-col items-center">
                <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleGalleryImagesChange(e.target.files)}
                    className="hidden"
                  />
                  <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
                  <p className="text-center text-base text-black font-medium px-2">
                    Upload gallery photo
                    <br />
                    or drag it here
                  </p>
                </label>
              </div>
            </div>

            <div className="mt-8">
              {mainImagePreview && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Cover Photo</h3>
                  <div className="relative inline-block">
                    <img
                      src={mainImagePreview}
                      alt="Main"
                      className="w-48 h-52 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={deleteMainImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}

              {galleryPreviews.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Gallery Photos</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Gallery ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => deleteGalleryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
