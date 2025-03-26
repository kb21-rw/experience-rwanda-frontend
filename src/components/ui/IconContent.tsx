import React, {FC} from 'react'
import { ReactNode } from "react";
import { IconType } from "react-icons";

type IconContentProps = {
  icon: IconType;
  content: ReactNode;
  className?: string;
};

const IconContent:FC<IconContentProps> = ({icon:Icon, content, className}) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
        <Icon className= "text-xl"/>
        <span className='text-lg font-inter font-normal'/>{content}<span/>

    </div>
  )
}

export default IconContent
