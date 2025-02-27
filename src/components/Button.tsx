import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

const Button: FC<{
  variant: "primary" | "secondary" | "text";
  iconAfter?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, className, variant, iconAfter, ...rest } = props;


  return <button className={twMerge("h-11 px-6 rounded-xl border border-red-orange-500 uppercase inline-flex items-center gap-2 relative  transition-all duration-500 group/button",
    variant === "primary" && "bg-red-orange-500 text-white",
    variant === "secondary" && "hover:bg-red-orange-500 hover:text-white",
    variant === "text" && "h-auto p-0 border-transparent after:transition-all after:duration-500 after:content-[''] after:w-0 after:h-px after:absolute after:top-full after:bg-red-orange-500 hover:after:w-full",
    className)} {...rest}>
    {children}
    {iconAfter && <span>{iconAfter}</span>}
  </button>
}

export default Button;