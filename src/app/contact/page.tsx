"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      alert("Message sent successfully!");
      form.current.reset();
    } catch {
      alert("Failed to send message, please try again.");
    }
  };
  return (
    <div className="py-25">
      <h1 className="text-10 text-center font-bold font-inter">Contact Us</h1>
      <div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-10 w-1/2 mx-auto mt-14.25"
        >
          <Input type="text" placeholder="Full names" required />
          <Input type="email" placeholder="Your email" required />
          <textarea
            name="message"
            placeholder="Your Message"
            className="border border-gray-700 rounded-md p-2 h-40"
            required
          ></textarea>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
