import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          " bg-site-secondary text-site-primary border border-site-secondary hover:bg-transparent hover:text-site-secondary",
        secondary:
          " bg-site-primary text-white border border-site-primary hover:bg-transparent hover:text-site-primary",
        secondaryOutline:
          " bg-transparent text-site-primary border border-site-primary hover:bg-site-primary hover:text-white",
        outline:
          " bg-transparent text-site-secondary border border-site-secondary hover:bg-site-secondary hover:text-site-primary",
        default:
          " bg-site-secondary text-site-primary border border-site-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        risk: "border border-red-700 bg-red-500 text-white  hover:bg-transparent hover:text-red-500",
        outlineRisk:
          " bg-transparent text-red-500 border border-red-500 hover:bg-red-500 hover:text-white",
      },
      size: {
        default: "h-10 px-6 text-md font-semibold",
        sm: "h-8 px-6 text-md font-semibold",
        lg: "h-12 px-8 text-md font-semibold",
        icon: "h-9 w-9",
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
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
