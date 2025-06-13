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
  fullName: string;
  email: string;
  phoneNumber: string;
  bookedSeats: number;
}

export type PaymentMethod = "card" | "momo";

export interface MomoFormInputs {
  phoneNumber: string;
}
