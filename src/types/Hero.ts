export type ImageProps = {
  name: string;
  url: string;
  width: number;
  height: number;
};

export type HeroProps = {
  title: string;
  description: string;
  backgroundImage: ImageProps;
};
