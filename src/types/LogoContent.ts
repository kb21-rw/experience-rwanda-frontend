export type LogoCard = {
  id: number | string;
  title: string;
  description: string;
  image: string;
};

export type LogoContent = {
  title: string;
  description: string;
  cards: LogoCard[];
};
