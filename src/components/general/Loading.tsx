import {IconLoader2} from "@tabler/icons-react";
import {twMerge} from "tailwind-merge";
import {SVGAttributes} from "react";

const Loading = ({className, ...props}: SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <IconLoader2 className={twMerge("animate-spin", className)} {...props}/>
  )
}

export default Loading;