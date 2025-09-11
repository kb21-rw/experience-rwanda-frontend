import React, { Dispatch, SetStateAction, useState } from "react";
import UserInfo from "./UserInfo";
import PaymentPopup from "./Payment";
import { ClientData } from "@/types/Popup";
import { PricingOption } from "@/types/trip";

const Popup = ({
  tripId,
  setSelectedTrip,
  priceTitle,
  priceDescription,
  pricingOptions,
}: {
  tripId: string;
  setSelectedTrip: Dispatch<SetStateAction<string | null>>;
  priceTitle: string;
  priceDescription: string;
  pricingOptions: PricingOption[];
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
        <div className="p-6 font-Inter">
          {currentStep === "userInfo" ? (
            <UserInfo
              setCurrentStep={setCurrentStep}
              setClientData={setClientData}
              clientData={clientData}
              priceTitle={priceTitle}
              priceDescription={priceDescription}
              pricingOptions={pricingOptions}
              onCancel={() => setSelectedTrip(null)}
              tripId={tripId}
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
