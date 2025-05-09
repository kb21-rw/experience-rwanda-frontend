import VerifyOtpForm from "./Form";

const VerifyOtppage = () => {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/uploads/hand.png')` }}
    >
      <VerifyOtpForm />
    </main>
  );
};

export default VerifyOtppage;
