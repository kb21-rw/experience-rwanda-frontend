import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface PopupProps {
  title: string;
  inputs?: { label: string; type: string; name: string }[];
  onSubmit: (data: Record<string, string>, event: React.FormEvent<HTMLFormElement>) => void;
  submitText?: string;
  cancelText?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onProceed?: () => void;
}

export default function Popup({
  title,
  inputs = [],
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  open,
  setOpen,
  onProceed,
}: PopupProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    inputs.forEach((input) => {
      data[input.name] = formData.get(input.name) as string;
    });
    onSubmit(data, event);
    if (onProceed) onProceed(); // Trigger the next popup only when needed
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <h1 className="text-lg font-bold text-center">{title}</h1>
        <form onSubmit={handleSubmit} className="mt-3">
          {inputs.length > 0 ? (
            inputs.map((input, index) => (
              <div key={index} className="mt-2">
                <Label className="block text-xs font-medium">{input.label}</Label>
                <Input
                  className="w-full mt-1 p-2 border border-gray-500"
                  type={input.type}
                  name={input.name}
                  required
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No input fields available.</p>
          )}
          <div className="mt-3 flex gap-4">
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