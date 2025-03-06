import { Button } from "../ui/Button";
import CustomPopup from "./Custom";

const CheckoutPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <CustomPopup open={true} onOpenChange={onClose}>
      <h1 className="text-lg font-medium">Checkout</h1>
      <p className="text-sm mt-2">Payment Method</p>
      <div className="mt-3 text-left">
        <label className="block text-xs font-medium">
          <input type="radio" name="payment" className="mr-2" /> MTN Mobile
          Money
        </label>
        <label className="block text-xs font-medium mt-2">
          <input type="radio" name="payment" className="mr-2" /> Credit/Debit
          Card
        </label>
      </div>
      <div className="mt-4 flex gap-4">
        <Button className="w-full" variant="outline" onClick={onClose}>
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
