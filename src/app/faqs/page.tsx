import { Button } from "@/components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { faqData } from "@/data/fads";
import { ChevronDown } from "lucide-react";

const Faqs = () => {
  return (
    <main className="min-h-screen relative text-white bg-site">
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {faqData.title}
            </h1>
            <p className="text-lg text-gray-300">{faqData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 " id="faqs" >
            {faqData.faqs.map((faq, index) => (
              <Collapsible key={index} className="border-b-0.5 border-gray-200 pb-4">
                <CollapsibleTrigger asChild>
                  <button className="flex justify-between items-center w-full text-left font-semibold text-lg hover:text-gray-200">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform data-[state=open]:rotate-180" />
                  </button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <p className="mt-3 text-gray-400 text-base leading-relaxed text-justify">
                    {faq.answer}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <div className="text-center mt-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Faqs;
