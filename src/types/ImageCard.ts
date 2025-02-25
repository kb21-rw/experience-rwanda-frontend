import { Image } from "./Image";

export type Card = {
  id: number;
  place: string;
  price: string;
  date: string;
  url: string;
  image: Image;
};

export type Row = {
  id: number;
  __component: string;
  title: string;
  description?: string;
  cards: Card[];
};
