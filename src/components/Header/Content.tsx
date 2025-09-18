import { HeaderVariant } from "@/enums/Header";
import clsx from "clsx";

interface HeaderProps {
  title: string;
  description: string;
  variant: HeaderVariant;
}

const headingStyles: Record<HeaderVariant, string> = {
  [HeaderVariant.PRIMARY]: "font-bold text-center",
  [HeaderVariant.SECONDARY]: "font-medium text-left",
};

const descriptionStyles: Record<HeaderVariant, string> = {
  [HeaderVariant.PRIMARY]: "text-center md:w-2/3 md:mx-auto",
  [HeaderVariant.SECONDARY]: "text-left",
};

const Content = ({
  title,
  description,
  variant = HeaderVariant.PRIMARY,
}: HeaderProps) => {
  return (
    <div className="flex flex-col gap-6">
      <h2
        className={clsx(
          "text-3xl md:text-5xl lg:text-5.8xl leading-none font-Figtree",
          headingStyles[variant]
        )}
      >
        {title}
      </h2>
      <p
        className={clsx(
          "text-base font-normal font-inter",
          descriptionStyles[variant]
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default Content;
