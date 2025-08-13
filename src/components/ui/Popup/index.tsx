import React, { Dispatch, SetStateAction, useState } from "react";
import UserInfo from "./UserInfo";
import PaymentPopup from "./Payment";
import { ClientData } from "@/types/Popup";

const Popup = ({
  tripId,
  setSelectedTrip,
}: {
  tripId: string;
  setSelectedTrip: Dispatch<SetStateAction<string | null>>;
}) => {
  const [currentStep, setCurrentStep] = useState<"userInfo" | "payment">(
    "userInfo"
  );
  const [clientData, setClientData] = useState<ClientData | undefined>();
  if (!currentStep) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 font-manrope">
          {currentStep === "userInfo" ? (
            <UserInfo
              setCurrentStep={setCurrentStep}
              setClientData={setClientData}
              clientData={clientData}
              onCancel={() => setSelectedTrip(null)}
            />
          ) : (
            <PaymentPopup
              setCurrentStep={setCurrentStep}
              clientData={clientData}
              tripId={tripId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
