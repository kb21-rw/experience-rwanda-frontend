export interface ApiResponse<T> {
  message: string;
  data?: T;
  status?: number;
}

export type ResetCodePopupProps = {
  onClose: () => void;
  email: string;
};

export type OTPInputProps = {
  code: string[];
  setCode: (code: string[]) => void;
  isVerifying: boolean;
  isResending: boolean;
  onVerify: () => void;
  onResend: () => void;
  timeLeft: number;
  error?: string | null;
};
