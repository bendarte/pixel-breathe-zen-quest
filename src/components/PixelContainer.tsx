
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelContainerProps {
  children: ReactNode;
  className?: string;
}

const PixelContainer = ({ children, className }: PixelContainerProps) => {
  return (
    <div className={cn("pixel-container", className)}>
      {children}
    </div>
  );
};

export default PixelContainer;
