import { ReactNode } from "react";

export interface BookingPopupProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
export type Step = {
  title: string;
  subTitle?: string;
  content: ReactNode;
  showBack?: boolean;
  showProceed?: boolean;
  onProceed?: () => boolean | void;
};

export type PopupProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  steps: Step[];
};

export type FormErrors = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type PaymentMethod = "card" | "momo";
