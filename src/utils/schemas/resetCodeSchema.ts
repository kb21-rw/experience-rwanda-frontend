import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    isVerified: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export interface ApiResponse<T> {
  message: string;
  data?: T;
  status?: number;
}

export interface ResetCodePopupProps {
  onClose: () => void;
  email: string;
}

export interface OTPInputProps {
  code: string[];
  setCode: (code: string[]) => void;
  isVerifying: boolean;
  isResending: boolean;
  isCodeExpired: boolean;
  remainingTime: number | null;
  onVerify: () => void;
  onResend: () => void;
}

export interface ResetPasswordFormProps {
  onSubmit: (data: { newPassword: string }) => void;
  isLoading: boolean;
  isCodeExpired: boolean;
} 