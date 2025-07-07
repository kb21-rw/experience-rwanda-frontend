"use client";
import React from "react";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/Button";
import { UserPlusIcon } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex justify-between items-center py-12 pb-7 pl-5 pr-10">
        <h1 className="text-3xl font-semibold">Users Information</h1>
        <Button variant="primary">
          <UserPlusIcon />
          Invite
        </Button>
      </div>
      <p>{user?.fullName}</p>
    </div>
  );
};

export default Profile;
