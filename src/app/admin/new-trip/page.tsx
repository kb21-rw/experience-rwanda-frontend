"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import PricingOption from "./PricingOption";
import TripPackage from "./TripPackage";

type TripPackageType = {
  id: number;
  selectedOptions: string[];
  customOptions: string[];
  newOption: string;
};

const CreateTrip = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [tripPackages, setTripPackages] = useState<TripPackageType[]>([
    { id: 1, selectedOptions: [], customOptions: [], newOption: "" },
  ]);

  const {
    fields: pricingOptions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "pricingOptions",
  });

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

      await response.json();
      reset();
      toast.success("🎉 Trip was created successfully", {
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
    <div className="p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Trips | New Trip</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-black mb-2">Title</Label>
            <Input id="title" type="text" {...register("title")} placeholder="Hike with vibes at Muhabura volcano" className="w-full px-3 py-2 border border-black rounded-md" />
          </div>

          <div>
            <Label htmlFor="destination" className="block text-sm font-medium text-black mb-2">Destination</Label>
            <Input id="location" type="text" {...register("destination")} placeholder="Musanze district" className="w-full px-3 py-2 border border-black rounded-md" />
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-black mb-2">Description</Label>
            <textarea id="description" {...register("description")} rows={4} className="w-full px-3 py-2 border border-black rounded-md" placeholder="Enter trip description..." />
          </div>

          <div>
            <Label className="block text-2xl font-bold text-black mb-6">Gallery</Label>
            <div className="flex gap-12">
              {/* Main Image Upload */}
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
                    Upload Cover photo<br />or drag it here
                  </p>
                </label>
              </div>

              {/* Gallery Images Upload */}
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
                    Upload gallery photo<br />or drag it here
                  </p>
                </label>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8">
              {/* Main Image Preview */}
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

              {/* Gallery Images Preview */}
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
              <Label htmlFor="departureTime" className="block text-sm font-medium text-black mb-2">Departure Time</Label>
              <Input type="date" {...register("departureTime")} className="w-32 p-2 border border-black rounded-md" />
            </div>
            <div>
              <Label htmlFor="returnTime" className="block text-sm font-medium text-black mb-2">Return Time</Label>
              <Input type="date" {...register("returnTime")} className="w-32 p-2 border border-black rounded-md" />
            </div>
            <div>
              <Label htmlFor="seats" className="block text-sm font-medium text-black mb-2">Seats</Label>
              <Input id="seats" type="number" {...register("seats")} placeholder="60 seats" className="w-32 p-2 border text-black border-black rounded-md" />
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
