import { useState } from "react";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info(email);
    setEmail("");
  };

  return (
    <div>
      <p className="text-sm">
        Subscribe to our newsletter for the latest updates on features and
        releases.
      </p>
      <form className="flex items-center mt-4 gap-6" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email Address"
          className="p-3 border focus:outline-none w-4/5 text-site"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-inherit hover:bg-site-secondary   text-white border border-site-secondary"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs mt-4">
        By subscribing, you consent to our{" "}
        <a href="#" className="underline hover:underline-offset-2">
          Privacy Policy
        </a>{" "}
        and receive updates.
      </p>
    </div>
  );
};

export default SubscribeForm;
