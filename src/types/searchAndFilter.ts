export type DateField = {
  from: Date;
  to: Date;
};
export type PriceField = {
  from: number;
  to: number;
};

export type LocationField = {
  location?: string;
};

export type FormValues = {
  location?: string;
  date?: DateField | null;
  price?: PriceField;
};
