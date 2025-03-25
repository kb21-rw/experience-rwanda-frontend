import { ReactNode } from "react";
import { IconType } from "react-icons";

type IconContentProps = {
  icon: IconType;
  content: ReactNode;
  className?: string;
};

export default IconContentProps;
