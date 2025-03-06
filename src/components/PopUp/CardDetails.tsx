import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import CustomPopup from "./Custom";

const CardDetailsPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <CustomPopup open={true} onOpenChange={onClose}>
      <h1 className="text-xl font-bold text-center">Checkout</h1>
      <p className="text-sm mt-3 font-medium">Confirm Payment</p>
      <div className="mt-4">
        <Label className="block text-sm font-medium">Card Number</Label>
        <Input
          className="w-full mt-2 p-3 border border-gray-500 rounded-md"
          type="text"
          placeholder="40906677764335"
        />
        <Label className="block text-sm font-medium mt-3">Name on Card</Label>
        <Input
          className="w-full mt-2 p-3 border border-gray-500 rounded-md"
          type="text"
          placeholder="e.g John Doe"
        />
        <div className="flex gap-4 mt-3">
          <div className="w-1/2">
            <Label className="block text-sm font-medium">Expiry Month</Label>
            <Input
              className="w-full mt-2 p-3 border border-gray-500 rounded-md"
              type="text"
              placeholder="e.g May"
            />
          </div>
          <div className="w-1/2">
            <Label className="block text-sm font-medium">Expiry Year</Label>
            <Input
              className="w-full mt-2 p-3 border border-gray-500 rounded-md"
              type="text"
              placeholder="e.g 2025"
            />
          </div>
        </div>
        <Label className="block text-sm font-medium mt-3">CVC</Label>
        <Input
          className="w-full mt-2 p-3 border border-gray-500 rounded-md"
          type="text"
          placeholder="e.g CVC"
        />
      </div>
      <div className="mt-6 flex gap-4">
        <Button className="w-full" variant="secondary" onClick={onClose}>
          Back
        </Button>
        <Button className="w-full" variant="default">
          Proceed To Checkout
        </Button>
      </div>
    </CustomPopup>
  );
};

export default CardDetailsPopup;
