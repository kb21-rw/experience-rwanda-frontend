"use client";
import ProfileCard from "./Card";
import { useSidebar } from "../ui/SideBar/sidebar";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useState } from "react";

interface User {
  name: string;
  email: string;
}

export default function ProfileContent() {
  const { state } = useSidebar();
  // get user from access token from localstorag
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const payload = jwt.decode(accessToken);
      console.log(payload);
      setUser(payload as User);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-8 gap-4">
      <ProfileCard
        name={user?.name || ""}
        imageSrc={""}
        isExpanded={state === "expanded"}
        alt={""}
      />
      {state === "expanded" && (
        <div className="text-center">{user?.name || ""}</div>
      )}
    </div>
  );
}
