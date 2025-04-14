import { FC, ReactNode } from "react"
import { IconType } from "react-icons"

type IconContentProps = {
  icon: IconType
  content: ReactNode
  className?: string
}

const IconContent: FC<IconContentProps> = ({
  icon: Icon,
  content,
  className,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="bg-black p-3 rounded-full">
        <Icon
          className="text-white text-xl"
          size={20}
        />
      </div>
      <span className="text-md font-inter font-normal text-black">
        {content}
      </span>
    </div>
  )
}

export default IconContent
