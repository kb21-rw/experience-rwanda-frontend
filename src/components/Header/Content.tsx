import { HeaderVariant } from "@/types/Header";
import clsx from "clsx";

interface HeaderProps {
  title: string;
  description: string;
  variant: HeaderVariant;
}

const Content = ({ title, description, variant }: HeaderProps) => {
  const styles = clsx({
    "font-bold text-center": variant === "PRIMARY",
    "font-medium text-left": variant === "SECONDARY",
  });
  return (
    <div className="flex flex-col gap-10 content-wrapper">
      <h2 className={`text-3xl ${styles}`}>{title}</h2>
      <p className="text-xl">{description}</p>
    </div>
  );
};

export default Content;
