"use client";
import React from "react";
import PersonalInformation from "./components/PersonalInformation";
import ProfileHeader from "./components/ProfileHeader";

const Profile = () => {
  return (
    <div className="py-12 pb-7 pl-5 pr-10">
      <ProfileHeader />
      <PersonalInformation />
    </div>
  );
};

export default Profile;
