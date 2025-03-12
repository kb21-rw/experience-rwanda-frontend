import { Button } from "../ui/button";
import CustomPopup from "./Custom";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

const CheckoutPopup: React.FC<{
  onClose: () => void;
  onSelectCard: () => void;
}> = ({ onClose, onSelectCard }) => {
  return (
    <CustomPopup open={true} onOpenChange={onClose}>
      <h1 className="text-lg font-bold text-center">Checkout</h1>
      <p className="text-sm mt-2 font-semibold">Payment Method</p>
      <div className="mt-3 text-left">
        <Label className="flex text-xs font-medium">
          <Input
            type="radio"
            name="payment"
            className="mr-2 w-3 -mt-4 text-black"
          />
          MTN Mobile Money
        </Label>
        <Label className="text-xs font-medium mt-2 flex">
          <Input
            type="radio"
            name="payment"
            className="mr-2 w-3 -mt-4 text-black"
            onClick={onSelectCard}
          />
          Credit/Debit Card
        </Label>
      </div>
      <div className="mt-3">
        <Label className="block text-xs font-medium mt-2">Phone Number</Label>
        <Input
          className="w-full mt-1 p-2 border border-gray-500"
          type="number"
          placeholder="0781234567"
        />
      </div>
      <div className="mt-4 flex gap-4">
        <Button className="w-full" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-full" variant="default">
          Confirm Payment
        </Button>
      </div>
    </CustomPopup>
  );
};

export default CheckoutPopup;
