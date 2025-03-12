import { Button } from "../ui/button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import CustomPopup from "./Custom";

const BookingPopup: React.FC<{
  onProceed: () => void;
  onClose: () => void;
}> = ({ onProceed, onClose }) => {
  return (
    <CustomPopup open={true} onOpenChange={onClose}>
      <h1 className="text-lg font-bold text-center">Book Your Trip</h1>
      <div className="mt-3">
        <Label className="block text-xs font-medium">First Name</Label>
        <Input className="w-full mt-1 p-2 border border-gray-500" type="text" />
        <Label className="block text-xs font-medium mt-2">Last Name</Label>
        <Input className="w-full mt-1 p-2 border border-gray-500" type="text" />
        <Label className="block text-xs font-medium mt-2">Email</Label>
        <Input
          className="w-full mt-1 p-2 border border-gray-500"
          type="email"
        />
      </div>
      <div className="mt-3 flex gap-4">
        <Button className="w-full" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-full" variant="default" onClick={onProceed}>
          Proceed to Checkout
        </Button>
      </div>
    </CustomPopup>
  );
};
export default BookingPopup;
