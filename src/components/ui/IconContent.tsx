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
    <div className="flex items-center gap-3">
      <div className={`${className}`}>
        <Icon
          className="text-xl"
          size={20}
        />
      </div>
      <span className="text-sm font-inter font-normal">{content}</span>
    </div>
  )
}

export default IconContent
