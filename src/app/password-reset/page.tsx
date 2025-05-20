"use client";

import PasswordResetForm from "./Form";

const PasswordReset = () => {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/uploads/hand.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PasswordResetForm />
    </main>
  );
};

export default PasswordReset;
