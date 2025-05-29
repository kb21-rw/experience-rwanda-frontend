"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import PricingOption from "./PricingOption";
import TripPackage from "./TripPackage";
import ImageUploader from "./ImageUploader";

type TripPackageType = {
  id: number;
  selectedOptions: string[];
  customOptions: string[];
  newOption: string;
};
const CreateTrip = () => {
  const [tripPackages, setTripPackages] = useState<TripPackageType[]>([
    { id: 1, selectedOptions: [], customOptions: [], newOption: "" },
  ]);
  const { register, handleSubmit, control, reset } = useForm();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const {
    fields: pricingOptions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pricingOptions",
  });

  const onSubmit = async (data: unknown) => {
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
          <ImageUploader
            setMainImage={setMainImage}
            setGalleryImages={setGalleryImages}
          />
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
          <TripPackage
            setTripPackages={setTripPackages}
            tripPackages={tripPackages}
          />
          <PricingOption
            pricingOptions={pricingOptions}
            register={register}
            remove={remove}
            append={append}
          />

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
