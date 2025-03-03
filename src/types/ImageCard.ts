export type Card = {
  id: number;
  place: string;
  price: string;
  date: string;
  url: string;
};

export type Row = {
  id: number;
  title: string;
  description: string;
  cards: Card[];
};
