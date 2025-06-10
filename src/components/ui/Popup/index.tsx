import React, { Dispatch, SetStateAction, useState } from "react";
import UserInfo from "./UserInfo";
import PaymentPopup from "./Payment";
import { ClientData } from "@/types/Popup";

const Popup = ({
  tripId,
  setSelectedTrip,
  pricingId,
}: {
  tripId: string;
  setSelectedTrip: Dispatch<SetStateAction<string | null>>;
  pricingId: string;
}) => {
  const [currentStep, setCurrentStep] = useState<"userInfo" | "payment">(
    "userInfo"
  );
  const [clientData, setClientData] = useState<ClientData | undefined>();
  if (!currentStep) {
    return null;
  }
  console.log({ pricingId, clientData });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 font-inter">
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
              pricingId={pricingId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
