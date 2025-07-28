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

    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(tripSchema),
    defaultValues,
  });
  const {
    onSubmit,
    setCoverImage,
    setGalleryImages,
    // tripPackages,
    // setTripPackages,
    defaultGalleryImages,
    defaultCoverImage,
    setDefaultGalleryImages,
    setDefaultCoverImage,
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
    setValue("coverImage", defaultCoverImage);
    setValue("galleryImages", defaultGalleryImages);
  }, [setValue, defaultCoverImage, defaultGalleryImages]);
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
          setCoverImage={setCoverImage}
          setGalleryImages={setGalleryImages}
          defaultCoverImage={defaultCoverImage}
          defaultGalleryImages={defaultGalleryImages}
          setDefaultCoverImage={setDefaultCoverImage}
          setDefaultGalleryImages={setDefaultGalleryImages}
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Departure</h3>
            <div className="flex flex-col xl:flex-row gap-4">
              <FormInput
                register={register}
                control={control}
                name="departureDate"
                label="Departure Date"
                type="date"
                errors={errors}
                onDisabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />

              <FormInput
                register={register}
                control={control}
                name="departureTime"
                label="Departure Time"
                type="time"
                placeholder="Select departure time"
                errors={errors}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Return</h3>
            <div className="flex flex-col xl:flex-row gap-4">
              <FormInput
                register={register}
                control={control}
                name="returnDate"
                label="Return Date"
                type="date"
                errors={errors}
                onDisabled={(date) =>
                  !getValues("departureDate") ||
                  date < new Date(getValues("departureDate"))
                }
              />

              <FormInput
                register={register}
                control={control}
                name="returnTime"
                label="Return Time"
                type="time"
                placeholder="Select return time"
                errors={errors}
              />
            </div>
          </div>

          <FormInput
            register={register}
            name="totalSeats"
            label="Seats"
            placeholder="60 seats"
            type="number"
            errors={errors}
          />
        </div>

        {/* <TripPackage
          setTripPackages={setTripPackages}
          tripPackages={tripPackages}
        /> */}
        <PricingOption
          pricingOptions={pricingOptions}
          register={register}
          remove={remove}
          append={append}
          errors={errors}
        />

        <div className="pt-20">
          <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
            {tripId ? "Update Trip" : "Create New Trip"}
          </button>
        </div>
      </div>
      {isSubmitting && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50">
          <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
    </form>
  );
};

export default TripForm;
