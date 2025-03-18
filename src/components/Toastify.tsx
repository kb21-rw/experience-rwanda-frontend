"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastify = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const resp = searchParams.get("resp"); // Get the `resp` query parameter

    if (resp) {
      try {
        const decodedResp = decodeURIComponent(resp);

        const parsedData = JSON.parse(decodedResp);

        if (parsedData.status === "success") {
          toast.success("🎉 Trip was booked succesfully", {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Failed to parse response:", error);
      }
    }
  }, [searchParams]);

  return <ToastContainer />;
};

export default Toastify;
