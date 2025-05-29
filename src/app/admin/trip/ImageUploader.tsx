import React, { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({
  setMainImage,
  setGalleryImages,
}: {
  setMainImage: Dispatch<SetStateAction<File | null>>;
  setGalleryImages: Dispatch<SetStateAction<File[]>>;
}) => {
  const [galleryImageNames, setGalleryImageNames] = useState<string[]>([]);
  const [mainImageName, setMainImageName] = useState<string | null>(null);
  const handleMainImageChange = (file: File | null) => {
    if (file) setMainImage(file);
    setMainImageName(file ? file.name : null);
  };
  const onGalleryImagesChange = (files: FileList | null) => {
    handleGalleryImagesChange(files);
    if (files) {
      const names = Array.from(files).map((file) => file.name);

      setGalleryImageNames((prev) => [...prev, ...names]); // <- This REPLACES the previous list
    } else {
      setGalleryImageNames([]);
    }
  };
  const handleGalleryImagesChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    setGalleryImages((prev) => [...prev, ...newFiles]);
  };
  return (
    <div>
      <Label className="block text-2xl font-bold text-black mb-6">
        Gallery
      </Label>
      <div className="flex gap-12">
        {/* Cover Photo Upload */}
        <div className="flex flex-col items-center">
          <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleMainImageChange(e.target.files?.[0] || null)
              }
              className="hidden"
            />
            <FaCloudUploadAlt className="w-14 h-14 text-blue-600 mb-2" />
            <p className="text-center text-base text-black font-medium px-2">
              Upload Cover photo
              <br />
              or drag it here
            </p>
          </label>
          {mainImageName && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              {mainImageName}
            </p>
          )}
        </div>

        {/* Gallery Photo Upload */}
        <div className="flex flex-col items-center">
          <label className="w-48 h-52 border border-white bg-white shadow-md rounded-lg flex flex-col justify-center items-center cursor-pointer hover:shadow-lg transition">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => onGalleryImagesChange(e.target.files)}
              className="hidden"
            />
            <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
            <p className="text-center text-base text-black font-medium px-2">
              Upload gallery photo
              <br />
              or drag it here
            </p>
          </label>
          {galleryImageNames.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 text-center space-y-1">
              {galleryImageNames.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
