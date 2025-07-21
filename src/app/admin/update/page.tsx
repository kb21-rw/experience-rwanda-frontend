"use client";

import { Button } from "@/components/ui/Button";
import { IoShareSocial } from "react-icons/io5";
import UserInfoForm from "./Form";
import { useRouter } from "next/navigation";

const Users = () => {
  const router = useRouter();
  const handleInvite = () => {
    router.push("/admin/invite");
  };
  return (
    <section className="p-6 xl:p-10 font-inter">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-inter font-semibold">
          Update User Information
        </h1>
        <Button variant="primary" onClick={handleInvite}>
          <IoShareSocial />
          Invite
        </Button>
      </div>
      <div className="border border-gray-200 p-11.25 rounded-lg">
        <div className="mb-3 md:mb-7.5">
          <h4 className="text-xl font-semibold"> Personal Information</h4>
          <p className="text-sm">Update your personal details</p>
        </div>
        <UserInfoForm />
      </div>
    </section>
  );
};
export default Users;
