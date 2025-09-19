"use client";
import { Button } from "@/components/ui/Button";
import TripTable from "./TripTable";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const TripsPage = () => {
  const router = useRouter();
  return (
    <div className="p-6 xl:p-10 min-h-screen">
      <div className="flex flex-col gap-5 md:flex-row items-center md:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Trips</h1>
          <p className="text-white text-lg">Manage and track all experiences</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/admin/new-trip")}
          className="shadow-elegant"
          data-test-id="create-new-trip"
        >
          <Plus className="w-5 h-5" />
          Create New Trip
        </Button>
      </div>
      <TripTable />
    </div>
  );
};

export default TripsPage;
