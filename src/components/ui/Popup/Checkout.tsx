import Popup from "@/components/ui/Popup";
import { CheckoutPopupProps } from "@/types/Popup";

const CheckoutPopup =({ open, setOpen }: CheckoutPopupProps)=> {
  return (
    <Popup
      title="Checkout"
      subTitle="Payment Methods"
      
      inputs={[
        {label: "Mobile Money", type: "radio", name: "momo"},
        {label: "Credit/Debit Card", type: "radio", name: "card"},
        {label: "Phone Number", type: "tel", name: "phone" },
      ]}
      onSubmit={() => {
        setOpen(false); 
      }}
      submitText="Proceed to Checkout"
      cancelText="Cancel"
      open={open}
      setOpen={setOpen}
    />
  );
}
export default CheckoutPopup;
