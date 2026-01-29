import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed",
          {
            // Variants
            "bg-brand-black text-brand-white hover:bg-gray-800":
              variant === "primary",
            "bg-brand-white text-brand-black border border-gray-200 hover:bg-gray-50":
              variant === "secondary",
            "text-gray-600 hover:text-brand-black hover:bg-gray-100":
              variant === "ghost",
            "bg-red-500 text-white hover:bg-red-600": variant === "danger",
            // Sizes
            "text-sm px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
