import SignupForm from "./Form";

export default function SignupPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url('/uploads/hand.png')` }}
    >
      <SignupForm />
    </main>
  );
}
