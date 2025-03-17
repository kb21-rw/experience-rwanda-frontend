import { aboutUsData } from "../../data/aboutUsData";
import Content from "./Content";

const  AboutContent = () => {
  const { title, description } = aboutUsData;
  return (
    <section className="font-Inter w-full h-fit py-16">
      <Content title={title} description={description} />
    </section>
  );
};

export default  AboutContent;
