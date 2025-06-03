import { useState } from "react";
import { toast } from "react-toastify";
import { TripPackageType } from "@/types/trip";
import { z } from "zod";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { UseFormReset } from "react-hook-form";

type FormData = z.infer<typeof tripSchema>;

export function useTripFormSubmit(defaultValues: FormData, tripId?: string) {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [defaultGalleryImages, setDefaultGalleryImages] = useState<
    {
      url: string;
      deleted?: boolean;
      id?: string;
      tripId?: string;
    }[]
  >(defaultValues.galleryImages || []);
  const [defaultMainImage, setDefaultMainImage] = useState<string>(
    defaultValues.coverImage || ""
  );
  const [tripPackages, setTripPackages] = useState<TripPackageType[]>([
    { id: 0, selectedOptions: [], customOptions: [], newOption: "" },
  ]);

  const onSubmit = async (data: FormData, reset: UseFormReset<FormData>) => {
    const formData = new FormData();
    formData.append("tripData", JSON.stringify(data));

    if (mainImage) {
      formData.append("coverImage", mainImage);
    }

    galleryImages?.forEach((file) => {
      formData.append("galleryImages", file);
    });
    try {
      const response = await fetch(
        tripId
          ? `${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/trips`,
        {
          method: tripId ? "PUT" : "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create trip");
      }
      const formResult = await response.json();
      if (tripId) {
        reset(formResult);
      } else {
        reset();
      }
      toast.success("Trip was created successfully");
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Error creating trip");
    }
  };

  return {
    onSubmit,
    mainImage,
    setMainImage,
    galleryImages,
    setGalleryImages,
    tripPackages,
    setTripPackages,
    defaultGalleryImages,
    defaultMainImage,
    setDefaultGalleryImages,
    setDefaultMainImage,
  };
}
