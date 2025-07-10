"use client";
import React from "react";
import PersonalInformation from "./components/PersonalInformation";
import ProfileHeader from "./components/ProfileHeader";
import ProtectedRoute from "@/components/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute>
      <div className="py-12 pb-7 pl-5 pr-10">
        <ProfileHeader />
        <PersonalInformation />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
