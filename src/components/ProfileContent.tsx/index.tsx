"use client";
import ProfileCard from "./Card";
import { useSidebar } from "../ui/SideBar/sidebar";
import { useAuth } from "@/context/ContextProvider";

export default function ProfileContent() {
  const { state } = useSidebar();
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-8 gap-4">
      <ProfileCard
        name={user?.name || ""}
        imageSrc={user?.image || ""}
        isExpanded={state === "expanded"}
        alt={user?.name || ""}
      />
      {state === "expanded" && (
        <div className="text-center">{user?.name || ""}</div>
      )}
    </div>
  );
}
