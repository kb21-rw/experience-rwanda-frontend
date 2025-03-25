import React, {FC} from 'react'
import IconContentProps from '@/types/IconContent.types'
const IconContent:FC<IconContentProps> = ({icon:Icon, content, className}) => {
  return (
    <div className={`flex items-center ${className}`}>
        <Icon className= "text-xl"/>
        <span className='text-lg font-inter font-normal'/>{content}<span/>

    </div>
  )
}

export default IconContent
