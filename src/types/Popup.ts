import { ReactNode } from "react";

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

export interface ClientData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type PaymentMethod = "card" | "momo";

export interface MomoFormInputs {
  phoneNumber: string;
}
