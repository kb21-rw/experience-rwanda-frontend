"use client";
import { Admin } from "@/types/Admin";
import AdminList from "./AdminList";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useAuth } from "@/context/authContext";
import { redirect } from "next/navigation";

const Admins = () => {
  const { token } = useAuth();

  const {
    data: admins,
    error: adminsError,
    isLoading: adminsLoading,
  } = useSWR<Admin[]>(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/admins`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (token === null) {
    redirect("/login?redirect=admin/admins");
  } else if (adminsError?.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    redirect("/login?redirect=admin/admins");
  }

  return (
    <AdminList
      admins={admins}
      isLoading={adminsLoading}
      error={adminsError ? "Failed to fetch admins" : ""}
    />
  );
};

export default Admins;
