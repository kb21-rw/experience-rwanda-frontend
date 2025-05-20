"use client";
import user from "@/data/user.json";
import ProfileCard from "./Card";
import { useSidebar } from "../ui/SideBar/sidebar";

export default function ProfileContent() {
  const { state } = useSidebar();
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-8 gap-4">
      <ProfileCard imageSrc={"/uploads/giraffe.jpg"} alt={user.name} />
      {state === "expanded" && <div className="text-center">{user.name}</div>}
    </div>
  );
}
