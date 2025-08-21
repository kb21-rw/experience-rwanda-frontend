"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { contactSchema } from "@/utils/schemas/contactSchema";

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full "
    >
      <Input
        type="text"
        placeholder="Full names"
        data-testId="contact-full-names"
        {...register("name")}
      />
      {errors.name && (
        <p className="text-red-600 text-sm">{errors.name.message}</p>
      )}

      <div className="grid grid-cols-2 w-full gap-4">
        <Input
          type="email"
          placeholder="Your email"
          data-testId="contact-full-names"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}

        <Input
          type="number"
          placeholder="Your phone number"
          data-testId="contact-email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>
      <Input
        type="text"
        placeholder="Your subject"
        data-testId="contact-email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-red-600 text-sm">{errors.email.message}</p>
      )}
      <div>
        <textarea
          placeholder="Your Message"
          className="border border-gray-125 bg-transparent rounded-md p-2 h-30 w-full"
          data-testId="contact-message"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-red-600 text-sm">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        data-testId="contact-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
};

export default ContactForm;
