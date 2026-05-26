"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-touch",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary text-white hover:bg-blue-700 active:scale-95 shadow-md hover:shadow-lg",
        secondary:
          "bg-brand-secondary text-white hover:bg-emerald-600 active:scale-95 shadow-md hover:shadow-lg",
        accent:
          "bg-brand-accent text-white hover:bg-amber-600 active:scale-95 shadow-md hover:shadow-lg",
        outline:
          "border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white active:scale-95",
        ghost:
          "text-slate-700 hover:bg-slate-100 active:scale-95",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#1ebe5d] active:scale-95 shadow-md hover:shadow-lg",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
