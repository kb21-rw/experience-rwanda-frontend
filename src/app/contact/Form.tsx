"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "react-toastify";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const validateInputs = (
    name: string,
    email: string,
    message: string
  ): boolean => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!name || name.length < 2) {
      newErrors.name = "Please enter your full name.";
      isValid = false;
    }

    if (!email || !isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!message || message.length < 5) {
      newErrors.message = "Your message is too short.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const isValid = validateInputs(name, email, message);
    if (!isValid) return;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      toast.success("Message sent successfully!");

      formRef.current.reset();
      setErrors({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      className="flex flex-col gap-10 w-1/2 mx-auto mt-14.25"
    >
      <div>
        <Input type="text" name="name" placeholder="Full names" required />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Input type="email" name="email" placeholder="Your email" required />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          className="border border-gray-700 rounded-md p-2 h-40 w-full"
          required
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
