import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PopupProps } from "@/types/Popup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Popup =({
  title,
  subTitle,
  inputs = [],
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  open,
  setOpen,
  onProceed,
}: PopupProps)=> {
  const [selectedPayment, setSelectedPayment] = useState("");
  const router = useRouter();

  const handleCardPayment = (method: string) => {
    setSelectedPayment(method);
    if (method === "card") {
      setOpen(false); 
      router.push("/payment"); 
    }
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    inputs.forEach((input) => {
      data[input.name] = formData.get(input.name) as string;
    });
    onSubmit(data, event);
    if (onProceed) {
      onProceed();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-112.5">
        <h1 className="text-3xl font-bold text-center font-inter">{title}</h1>
        <h4 className="font-bold text-xl font-inter">{subTitle}</h4>
        <form onSubmit={handleSubmit} className="mt-3">
          {inputs.length > 0 ? (
            inputs.map((input, index) => (
              <div key={index}   className={`mt-2 ${input.type === "radio" ? "flex items-center gap-3" : ""}`}
              >
                {input.type === "radio" ? (
                  <>
                    <Input
                      type={input.type}
                      name="paymentMethod"
                      value={input.name}
                      checked={selectedPayment === input.name}
                      onChange={() => handleCardPayment(input.name)}
                    />
                    <Label className="text-base font-medium">{input.label}</Label>
                  </>
                ) : (
                  <>
                    <Label className="block text-base font-medium">{input.label}</Label>
                    <Input
                      className="w-full mt-1 p-2 border border-gray-500"
                      type={input.type}
                      name={input.name}
                      required
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No input fields available.</p>
          )}
          <div className="mt-5 flex gap-4">
            <Button type="button" className="w-full" variant="secondary" onClick={() => setOpen(false)}>
              {cancelText}
            </Button>
            <Button type="submit" className="w-full" variant="default">
              {submitText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Popup;