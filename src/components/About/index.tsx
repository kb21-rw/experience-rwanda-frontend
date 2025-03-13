import { aboutUsData } from "../../data/aboutUsData";
import Content from "./content";

const  AboutContent = () => {
  const { title, description } = aboutUsData;
  return (
    <section className="font-Inter w-full h-fit pb-9">
      <Content title={title} description={description} />
    </section>
  );
};

export default  AboutContent;
