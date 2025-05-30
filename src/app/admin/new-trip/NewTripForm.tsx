"use client";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PricingOption from "./PricingOption";
import TripPackage from "./TripPackage";
import FormInput from "@/components/FormInput";
import ImageUploader from "./ImageUploader";
import { TripPackageType } from "@/types/trip";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema } from "@/utils/schemas/tripSchema";

type FormData = z.infer<typeof tripSchema>;

const NewTripForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(tripSchema),
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [tripPackages, setTripPackages] = useState<TripPackageType[]>([
    { id: 0, selectedOptions: [], customOptions: [], newOption: "" },
  ]);
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
      if (!response.ok) {
        throw new Error("Failed to create trip");
      }
      await response.json();
      reset();
      toast.success("Trip was created successfully");
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Error creating trip");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16"
    >
      <div className="space-y-6">
        <FormInput
          register={register}
          name="title"
          label="Title"
          placeholder="Hike with vibes at Muhabura volcano"
          type="text"
          errors={errors}
        />
        <FormInput
          register={register}
          name="destination"
          label="Destination"
          placeholder="Musanze district"
          type="text"
          errors={errors}
        />
        <FormInput
          register={register}
          name="description"
          label="Description"
          placeholder="Enter trip description..."
          type="text"
          size="large"
          errors={errors}
        />

        <ImageUploader
          setMainImage={setMainImage}
          setGalleryImages={setGalleryImages}
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormInput
            register={register}
            name="departureTime"
            label="Departure Time"
            type="date"
            errors={errors}
          />

          <FormInput
            register={register}
            name="returnTime"
            label="Return Time"
            type="date"
            errors={errors}
          />

          <FormInput
            register={register}
            name="seats"
            label="Seats"
            placeholder="60 seats"
            type="number"
            errors={errors}
          />
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
          errors={errors}
          name="pricingOptions"
        />

        <div className="pt-20">
          <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
            Create New Trip
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewTripForm;
