"use client";
import React, { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FormInput from "@/components/FormInput";
import { z } from "zod";
import { useTripFormSubmit } from "@/hooks/useTripFormSubmit";
import ImageUploader from "@/components/ImageUploader";
import PricingOption from "@/components/PricingOption";
import { Card, CardContent } from "../ui/Card";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../ui/Button";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
// import TripPackage from "@/components/TripPackage";

type FormData = z.infer<typeof tripSchema>;

const TripForm = ({
  defaultValues,
  tripId,
}: {
  defaultValues: FormData;
  tripId?: string;
}) => {
  const form = useForm<FormData>({
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
    control: form.control,
    name: "pricingOptions",
  });

  useEffect(() => {
    form.setValue("coverImage", defaultCoverImage);
    form.setValue("galleryImages", defaultGalleryImages);
  }, [form.setValue, defaultCoverImage, defaultGalleryImages, form]);
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-background to-secondary/20">
      <CardContent className="p-8">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data, form.reset))}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormInput
                  form={form}
                  name="title"
                  label="Title"
                  placeholder="Hike with vibes at Muhabura volcano"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FormInput
                  form={form}
                  name="departureTime"
                  label="Departure Time"
                  type="datetime-local"
                  icon={<Calendar className="w-4 h-4 text-travel-blue" />}
                  minDate={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                />

                <FormInput
                  form={form}
                  name="returnTime"
                  label="Return Time"
                  type="datetime-local"
                  icon={<Calendar className="w-4 h-4 text-travel-blue" />}
                  minDate={format(
                    form.getValues("departureTime"),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <FormInput
                  form={form}
                  name="destination"
                  label="Destination"
                  placeholder="Musanze district"
                  icon={<MapPin className="w-4 h-4" />}
                  type="text"
                />
                <FormInput
                  form={form}
                  name="totalSeats"
                  label="Seats"
                  placeholder="60 seats"
                  icon={<Users className="w-4 h-4" />}
                  type="number"
                />
              </div>
              <FormInput
                form={form}
                name="description"
                label="Description"
                placeholder="Enter trip description..."
                type="textarea"
              />

              <PricingOption
                pricingOptions={pricingOptions}
                register={form.register}
                remove={remove}
                append={append}
                errors={form.formState.errors}
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

            {/* <TripPackage
          setTripPackages={setTripPackages}
          tripPackages={tripPackages}
        /> */}
            <div className="pt-20">
              <Button type="submit" variant="primary">
                {tripId ? "Update Trip" : "Create New Trip"}
              </Button>
            </div>
            {form.formState.isSubmitting && (
              <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50">
                <div className="flex items-center justify-center h-full">
                  <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default TripForm;
