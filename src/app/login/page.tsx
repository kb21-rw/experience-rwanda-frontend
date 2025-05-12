import LoginForm from "./Form";

export default function LoginPage() {
    return (
        <main
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/uploads/hand.png')" }}
        >
            <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
                <LoginForm />
            </div>
        </main>
    );
}
