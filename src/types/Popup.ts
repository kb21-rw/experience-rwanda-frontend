export type BookingPopupProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onProceed: () => void; 
  }

  
export type CheckoutPopupProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
  }

export type PopupProps = {
    title: string;
    subTitle?: string;
    inputs?: { label: string; type: string; name: string }[];
    onSubmit: (data: Record<string, string>, event: React.FormEvent<HTMLFormElement>) => void;
    submitText?: string;
    cancelText?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onProceed?: () => void;
}