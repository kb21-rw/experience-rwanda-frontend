import Popup from "@/components/ui/Popup";
import { BookingPopupProps } from "@/types/Popup";

const BookingPopup = ({ open, setOpen, onProceed }: BookingPopupProps) => {
  return (
    <Popup
      title="Book Your Trip"
      inputs={[
        { label: "First Name", type: "text", name: "firstName" },
        { label: "Last Name", type: "text", name: "lastName" },
        { label: "Email", type: "email", name: "email" },
      ]}
      onSubmit={(data) => {
        console.log("Booking Data:", data);
        setOpen(false);
        onProceed(); 
      }}
      submitText="Proceed to Checkout"
      cancelText="Cancel"
      open={open}
      setOpen={setOpen}
    />
  );
}
export default BookingPopup;
