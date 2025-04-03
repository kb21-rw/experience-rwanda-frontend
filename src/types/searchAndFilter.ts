export type DateField = {
  from: Date | undefined;
  to: Date | undefined;
};
export type PriceField = {
  min: number | undefined;
  max: number | undefined;
};

export type LocationField = {
  location: string;
};

export type FormValues = {
  location: string;
  date: DateField;
  price: PriceField;
};
