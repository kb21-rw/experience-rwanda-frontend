import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";

const ImageUploader = ({
  setCoverImage,
  setGalleryImages,
  defaultCoverImage,
  defaultGalleryImages,
  setDefaultCoverImage,
  setDefaultGalleryImages,
}: {
  setCoverImage: Dispatch<SetStateAction<File | null>>;
  setGalleryImages: Dispatch<SetStateAction<File[]>>;
  defaultCoverImage: string;
  defaultGalleryImages: {
    url: string;
    deleted?: boolean;
    id?: string;
    tripId?: string;
  }[];
  setDefaultCoverImage: Dispatch<SetStateAction<string>>;
  setDefaultGalleryImages: Dispatch<
    SetStateAction<
      { url: string; deleted?: boolean; id?: string; tripId?: string }[]
    >
  >;
}) => {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(
    defaultCoverImage || null
  );
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [defaultGalleryPreviews, setDefaultGalleryPreviews] = useState<
    string[]
  >(defaultGalleryImages.map((image) => image.url));
  const handleCoverImageChange = (file: File | null) => {
    if (!file) return;
    setCoverImage(file);
    const preview = URL.createObjectURL(file);
    setMainImagePreview(preview);
  };

  const handleGalleryImagesChange = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setGalleryImages((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setGalleryPreviews((prev) => [...prev, ...newPreviews]);
  };

  const deleteMainImage = () => {
    if (mainImagePreview) {
      URL.revokeObjectURL(mainImagePreview);
    }
    setDefaultCoverImage("");
    setCoverImage(null);
    setMainImagePreview(null);
  };

  const deleteGalleryImage = (index: number) => {
    URL.revokeObjectURL(galleryPreviews[index]);
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteDefaultGalleryImage = (index: number) => {
    setDefaultGalleryImages((prev) =>
      prev.map((image, i) =>
        i === index ? { ...image, deleted: true } : image
      )
    );
    setDefaultGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label className="block text-2xl font-bold text-black mb-6">
        Trip Pictures
      </Label>
      <div className="flex gap-12">
        <div className="flex flex-col items-center">
          <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleCoverImageChange(e.target.files?.[0] || null)
              }
              className="hidden"
            />
            <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
            <p className="text-center text-base text-black font-medium px-2">
              Upload Cover photo
              <br />
              {/* or drag it here */}
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
              {/* or drag it here */}
            </p>
          </label>
        </div>
      </div>

      <div className="mt-8">
        {mainImagePreview && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Cover Photo</h3>
            <div className="relative inline-block">
              <div className="w-48 h-52">
                <Image
                  src={mainImagePreview}
                  alt="Main"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
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
        <div className="flex flex-col gap-2">
          {(defaultGalleryImages.length > 0 || galleryPreviews.length > 0) && (
            <h3 className="text-lg font-semibold mb-2">Gallery Photos</h3>
          )}
          {defaultGalleryPreviews.length > 0 && (
            <div>
              <div className="grid grid-cols-4 gap-4">
                {defaultGalleryPreviews?.map((preview, index) => (
                  <div key={index} className="relative">
                    <div className="w-48 h-52">
                      <Image
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteDefaultGalleryImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {galleryPreviews.length > 0 && (
            <div>
              <div className="grid grid-cols-4 gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <div className="w-48 h-52">
                      <Image
                        src={preview}
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
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
  );
};

export default ImageUploader;
