import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
export default function Popup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <h1 className="text-lg font-bold text-center">Book Your Trip</h1>
        <div className="mt-3">
          <Label className="block text-xs font-medium">First Name</Label>
          <Input
            className="w-full mt-1 p-2 border border-gray-500"
            type="text"
          />
          <Label className="block text-xs font-medium mt-2">Last Name</Label>
          <Input
            className="w-full mt-1 p-2 border border-gray-500"
            type="text"
          />
          <Label className="block text-xs font-medium mt-2">Email</Label>
          <Input
            className="w-full mt-1 p-2 border border-gray-500"
            type="email"
          />
        </div>
        <div className="mt-3 flex gap-4">
          <Button className="w-full" variant="secondary">
            Cancel
          </Button>
          <Button className="w-full" variant="default">
            Proceed to Checkout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
