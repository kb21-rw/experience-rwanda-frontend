"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { updateUserSchema } from "@/utils/schemas/updateUserSchema";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useAuth } from "@/context/authContext";

type UpdateUserFormData = z.infer<typeof updateUserSchema>;

const UserInfoForm = () => {
  const { token } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  const { isLoading } = useSWR(
    token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/admins/profile/me`, token]
      : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    {
      onSuccess: (userData) => {
        reset({
          email: userData.email ?? "",
          name: userData.name ?? "",
        });
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to load profile");
      },
    }
  );

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      const payload = {
        email: data.email,
        name: data.name,
        ...(data.password && { password: data.password }),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/profile/me`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully!");
      router.push("/admin");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  if (isLoading) return <p>Loading profile...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center py-4 xl:py-10">
        <FaCloudUploadAlt className="w-14 h-14 text-black mb-2" />
        <p className="text-center">Profile picture</p>
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
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} placeholder="John Doe" />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
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
};

export default UserInfoForm;
