import { HeaderVariant } from "@/enums/Header";
import Content from "./Content";

interface HeaderProps {
  title: string;
  description: string;
  variant: HeaderVariant;
}

const Header = ({ title, description, variant }: HeaderProps) => {
  return (
    <section className="font-Inter w-full h-fit py-16">
      <Content title={title} description={description} variant={variant} />
    </section>
  );
};

export default Header;
