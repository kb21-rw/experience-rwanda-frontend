import { HeaderVariant } from "@/enums/Header";
import Content from "./Content";

interface HeaderProps {
  id: string;
  title: string;
  description: string;
  variant: HeaderVariant;
}

const Header = ({ id, title, description, variant }: HeaderProps) => {
  return (
    <section id={id} className="font-Inter w-full h-fit py-16">
      <Content title={title} description={description} variant={variant} />
    </section>
  );
};

export default Header;
