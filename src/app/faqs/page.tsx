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

          <div className="max-w-4xl mx-auto space-y-4" id="faqs">
  {faqData.faqs.map((faq, index) => (
    <Collapsible 
      key={index} 
      className="border border-gray-600/30 rounded-lg bg-gray-800/20 backdrop-blur-sm"
    >
      <CollapsibleTrigger asChild>
        <button className="flex justify-between items-center w-full text-left font-semibold text-lg hover:text-gray-200 p-6 transition-colors">
          <span className="pr-4">{faq.question}</span>
          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        <div className="px-6 pb-6">
          <p className="text-gray-300 text-base leading-relaxed">
            {faq.answer}
          </p>
        </div>
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
