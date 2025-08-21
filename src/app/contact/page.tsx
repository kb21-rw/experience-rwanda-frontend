import Image from "next/image";
import ContactForm from "./Form";
import Header from "@/components/Header";
import { HeaderVariant } from "@/enums/Header";

const ContactPage = () => {
  return (
    <section className="py-25 lg:bg-site  relative">
      <div className="content-wrapper grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="text-white z-10">
          <Header
            title="Contact Us"
            description="The harder you work for something, the greater you’ll feel when you achieve it."
            variant={HeaderVariant.SECONDARY}
          />
          <ContactForm />
        </div>

        <div className="relative hidden lg:block">
          <div className="w-3/4 h-full place-self-end">
            <Image
              src="/uploads/contactone.jpg"
              alt="contact"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </div>
          <Image
            src="/uploads/contacttwo.png"
            alt="contact"
            width={300}
            height={300}
            className="object-cover absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-3/4"
          />
        </div>
      </div>

      <div className="absolute inset-0 lg:hidden -z-10">
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
