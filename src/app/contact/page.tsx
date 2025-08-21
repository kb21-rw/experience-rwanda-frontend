import Image from "next/image";
import ContactForm from "./Form";
import Header from "@/components/Header";
import { HeaderVariant } from "@/enums/Header";

const ContactPage = () => {
  return (
    <section className="py-25 lg:bg-site  relative">
      <div className="content-wrapper grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
        <div className="text-white z-10">
          <Header
            title="Contact Us"
            description="The harder you work for something, the greater you’ll feel when you achieve it."
            variant={HeaderVariant.SECONDARY}
          />
          <ContactForm />
        </div>

        <div className="relative hidden lg:block z-20">
          <Image
            src="/uploads/contacttwo.png"
            alt="contact"
            width={1000}
            height={1000}
            className="object-cover h-3/4 rounded-tl-2xl rounded-bl-2xl overflow-hidden"
          />
        </div>
      </div>

      <div className="absolute inset-0 lg:inset-y-0 lg:right-0 lg:left-auto lg:w-1/3 lg:h-[70vh] lg:top-1/2 lg:-translate-y-1/2 -z-10 lg:z-10 flex items-center justify-center rounded-tl-2xl rounded-bl-2xl overflow-hidden">
        <Image
          src="/uploads/contactone.jpg"
          alt="contact"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </section>
  );
};

export default ContactPage;
