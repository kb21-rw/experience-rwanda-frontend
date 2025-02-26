import Hero from "./Component/Hero/Index";
import data from "./../../public/data/homepage.json";

export default function Home() {
  const hero = {
    ...data.data.attributes.hero,
    backgroundImage: {
      ...data.data.attributes.hero.backgroundImage.data.attributes,
    },
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>
      </div>
      <Hero {...hero} />
    </div>
  );
}
