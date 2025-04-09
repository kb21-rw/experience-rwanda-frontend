export type DateField = {
  from: Date | undefined;
  to: Date | undefined;
};
export type PriceField = {
  min: string | undefined;
  max: string | undefined;
};

export type FormValues = {
  location: string;
  dateRange: DateField;
  price: PriceField;
};
