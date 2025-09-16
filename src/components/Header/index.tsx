import { HeaderVariant } from "@/enums/Header";
import Content from "./Content";

interface HeaderProps {
  id?: string;
  title: string;
  description: string;
  variant?: HeaderVariant;
}

const Header = ({
  title,
  description,
  variant = HeaderVariant.PRIMARY,
}: HeaderProps) => {
  return (
    <section className="text-white mx-auto font-manrope w-full h-fit py-16">
      <Content title={title} description={description} variant={variant} />
    </section>
  );
};

export default Header;
