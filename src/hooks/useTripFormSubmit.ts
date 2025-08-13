import { useState } from "react";
import { toast } from "react-toastify";
import { TripPackageType } from "@/types/trip";
import { z } from "zod";
import { tripSchema } from "@/utils/schemas/tripSchema";
import { UseFormReset } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof tripSchema>;

export function useTripFormSubmit(defaultValues: FormData, tripId?: string) {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [defaultGalleryImages, setDefaultGalleryImages] = useState<
    {
      url: string;
      deleted?: boolean;
      id?: string;
      tripId?: string;
    }[]
  >(defaultValues.galleryImages || []);
  const [defaultCoverImage, setDefaultCoverImage] = useState<string>(
    defaultValues.coverImage || ""
  );
  const [tripPackages, setTripPackages] = useState<TripPackageType[]>([
    { id: 0, selectedOptions: [], customOptions: [], newOption: "" },
  ]);

  const router = useRouter();

  const onSubmit = async (data: FormData, reset: UseFormReset<FormData>) => {
    const formData = new FormData();
    formData.append("tripData", JSON.stringify(data));

    if (coverImage) {
      formData.append("coverImage", coverImage);
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
      await fetch("/api/revalidate/trips", {
        method: "POST",
      });

      reset(tripId ? formResult : undefined);
      toast.success("Trip was created successfully");
      router.push("/admin/trips");
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Error creating trip");
    }
  };

  return {
    onSubmit,
    coverImage,
    setCoverImage,
    galleryImages,
    setGalleryImages,
    tripPackages,
    setTripPackages,
    defaultGalleryImages,
    defaultCoverImage,
    setDefaultGalleryImages,
    setDefaultCoverImage,
  };
}
