export type Content = {
  title: string;
  description: string;
};

export type HeroContent = {
  id: number;
  imageUrl: string;
  content: Content;
};
