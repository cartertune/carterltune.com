import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

const Button: FC = (props: {
  variant: "primary" | "secondary" | "text";
  iconAfter?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, className, variant, iconAfter, ...rest } = props;


  return <button className={twMerge("h-11 px-6 rounded-xl border border-red-orange-500 uppercase inline-flex items-center gap-2",
    variant === "primary" && "bg-red-orange-500 text-white",
    variant === "secondary" && "",
    variant === "text" && "h-auto p-0 border-transparent",
    className)} {...rest}>
    {children}
    {iconAfter && <span>{iconAfter}</span>}
  </button>
}

export default Button;