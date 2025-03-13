import Popup from "@/components/ui/Popup";
import { CheckoutPopupProps } from "@/types/Popup";

const CheckoutPopup =({ open, setOpen }: CheckoutPopupProps)=> {
  return (
    <Popup
      title="Checkout"
      inputs={[
        { label: "Phone Number", type: "tel", name: "phone" },
      ]}
      onSubmit={(data) => {
        console.log("Checkout Data:", data);
        setOpen(false); 
      }}
      submitText="Pay Now"
      cancelText="Cancel"
      open={open}
      setOpen={setOpen}
    />
  );
}
export default CheckoutPopup;
