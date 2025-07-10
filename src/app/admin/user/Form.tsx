"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { updateUserSchema } from "@/utils/schemas/updateUserSchema";

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export default function UpdateUserForm() {
  const { id: userId } = useParams();
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || typeof userId !== "string") return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
        );

        if (!res.ok) throw new Error("User not found");

        const user = await res.json();

        reset({
          email: user.email,
          fullName: user.fullName,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId, reset]);

  const onSubmit = async (data: UpdateUserFormData) => {
    if (!userId || typeof userId !== "string") {
      toast.error("Invalid user ID.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("fullName", data.fullName);
      if (data.password) formData.append("password", data.password);
      if (image) formData.append("profilePicture", image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update user");
      }

      toast.success("User information updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center py-4 xl:py-10">
        <Label className="cursor-pointer">
          <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImage(file);
            }}
          />
        </Label>
        <p className="text-center">Profile picture</p>
        {image && <p className="text-sm mt-1 text-green-600">{image.name}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="pt-10 pb-3 xl:pt-28 xl:pb-8 text-center flex justify-center items-center">
        <Button
          type="submit"
          variant="primary"
          className="w-full xl:w-1/4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
}
