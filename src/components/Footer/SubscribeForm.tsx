import React from "react";

const SubscribeForm = () => {
  return (
    <div>
      <p>
        Subscribe to our newsletter for the latest updates on features and
        releases.
      </p>
      <form className="flex items-center mt-4 gap-6">
        <input
          type="email"
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
        By subscribing, you consent to our Privacy Policy and receive updates.
      </p>
    </div>
  );
};

export default SubscribeForm;
