"use client";

import ResetCodePopup from "@/components/ui/Popup/ResetCode";
import PasswordResetForm from "./Form";
import { useState } from "react";

const PasswordReset = () => {
  const [emailForReset, setEmailForReset] = useState<string | null>(null);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/uploads/hand.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PasswordResetForm onSuccess={(email) => setEmailForReset(email)} />
      {emailForReset && (
        <ResetCodePopup
          email={emailForReset}
          onClose={() => setEmailForReset(null)}
        />
      )}
    </main>
  );
};

export default PasswordReset;
