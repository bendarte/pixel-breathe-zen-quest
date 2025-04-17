
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "success";
}

const PixelButton = ({
  children,
  className,
  variant = "primary",
  ...props
}: PixelButtonProps) => {
  const variantClasses = {
    primary: "bg-pixel-blue hover:bg-pixel-purple",
    secondary: "bg-pixel-gray hover:bg-pixel-light-blue",
    success: "bg-pixel-green hover:bg-pixel-light-green",
  };

  return (
    <button
      className={cn(
        "pixel-button",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PixelButton;
