"use client";
import ProfileCard from "./Card";
import { useSidebar } from "../ui/SideBar/sidebar";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useState } from "react";
import Link from "next/link";

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
      setUser(payload as User);
    }
  }, []);
  return (
    <Link
      href="/admin/profile"
      className="flex flex-col items-center justify-center pt-4 pb-12 gap-4 hover:opacity-90"
    >
      <ProfileCard
        name={user?.name || ""}
        imageSrc={""}
        isExpanded={state === "expanded"}
        alt={""}
      />
      {state === "expanded" && (
        <p className="text-base font-medium tracking-[0%] text-center">
          {user?.name || ""}
        </p>
      )}
    </Link>
  );
}
