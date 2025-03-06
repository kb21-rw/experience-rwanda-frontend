import { Button } from "../ui/Button";
import CustomPopup from "./Custom";

const BookingPopup: React.FC<{
  onProceed: () => void;
  onClose: () => void;
}> = ({ onProceed, onClose }) => {
  return (
    <CustomPopup open={true} onOpenChange={onClose}>
      <h1 className="text-sm font-medium">Book Trip</h1>
      <div className="mt-3">
        <label className="block text-xs font-medium">First Name</label>
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          type="text"
        />
        <label className="block text-xs font-medium mt-2">Last Name</label>
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          type="text"
        />
        <label className="block text-xs font-medium mt-2">Email</label>
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          type="email"
        />
      </div>
      <div className="mt-3 flex gap-4">
        <Button className="w-full" variant="outline" onClick={onClose}>
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
