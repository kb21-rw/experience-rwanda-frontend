"use client";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { useTripFormSubmit } from "@/hooks/useTripFormSubmit";
import ImageUploader from "@/components/ImageUploader";
import PricingOption from "@/components/PricingOption";
import TripPackage from "@/components/TripPackage";

type FormData = z.infer<typeof tripSchema>;

const TripForm = ({
  defaultValues,
  tripId,
}: {
  defaultValues: FormData;
  tripId?: string;
}) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });
  const {
    onSubmit,
    setMainImage,
    setGalleryImages,
    tripPackages,
    setTripPackages,
    defaultGalleryImages,
    defaultMainImage,
    setDefaultGalleryImages,
    setDefaultMainImage,
  } = useTripFormSubmit(defaultValues, tripId);
  const {
    fields: pricingOptions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pricingOptions",
  });

  useEffect(() => {
    setValue("coverImage", defaultMainImage);
    setValue("galleryImages", defaultGalleryImages);
  }, [setValue, defaultMainImage, defaultGalleryImages]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, reset))}
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
          defaultMainImage={defaultMainImage}
          defaultGalleryImages={defaultGalleryImages}
          setDefaultMainImage={setDefaultMainImage}
          setDefaultGalleryImages={setDefaultGalleryImages}
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <FormInput
            register={register}
            control={control}
            name="departureTime"
            label="Departure Time"
            type="date"
            errors={errors}
            onDisabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />

          <FormInput
            register={register}
            control={control}
            name="returnTime"
            label="Return Time"
            type="date"
            errors={errors}
            onDisabled={(date) =>
              !getValues("departureTime") ||
              date < new Date(getValues("departureTime").setHours(0, 0, 0, 0))
            }
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

export default TripForm;
