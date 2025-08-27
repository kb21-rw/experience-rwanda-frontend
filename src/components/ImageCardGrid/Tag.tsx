import React from "react";
import clsx from "clsx";

const Tag = ({
  text,
  icon,
  className,
  variant,
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
}) => {
  const styles = clsx({
    "bg-white font-semibold px-2": variant === "default",
    "border border-black px-8": variant === "outline",
  });
  return (
    <div
      className={`py-2 font-[0.5rem] leading-[100%] rounded-full z-10 shadow-lg flex items-center gap-2 ${className} ${styles}`}
    >
      {icon && icon}
      {text}
    </div>
  );
};

export default Tag;
