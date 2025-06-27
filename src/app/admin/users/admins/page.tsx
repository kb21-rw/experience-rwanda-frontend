"use client";
import { Admin } from "@/types/Admin";
import AdminList from "./AdminList";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { useAuth } from "@/context/authContext";

const Admins = () => {
  const { token } = useAuth();
  const {
    data: admins,
    error: adminsError,
    isLoading: adminsLoading,
    mutate,
  } = useSWR<Admin[]>(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/admins`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log({ admins }, "++++++++");

  return (
    <AdminList
      admins={admins}
      isLoading={adminsLoading}
      error={adminsError ? "Failed to fetch admins" : ""}
      mutate={mutate}
    />
  );
};

export default Admins;
