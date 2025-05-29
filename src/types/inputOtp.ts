export interface ApiResponse<T> {
  message: string;
  data?: T;
  status?: number;
}

export type ResetCodePopupProps = {
  onClose: () => void;
  email: string;
};
