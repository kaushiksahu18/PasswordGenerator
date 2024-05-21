import * as React from "react";
import { useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import mergeRefs from "merge-refs";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const mouse_follower = document.getElementById("mouse-follower");
      if (buttonRef && buttonRef.current) {
        buttonRef?.current.addEventListener("mouseenter", () => {
          if (mouse_follower) {
            if (buttonRef?.current?.textContent) {
              mouse_follower.innerHTML = buttonRef?.current?.textContent;
            }
            gsap.to(mouse_follower, {
              width: "90px",
              height: "90px",
              duration: 0.2,
            });
          }
        });
        buttonRef?.current.addEventListener("mouseleave", () => {
          if (mouse_follower) {
            mouse_follower.innerHTML = "";
            gsap.to(mouse_follower, {
              width: "10px",
              height: "10px",
            });
          }
        });
      }
    }, [buttonRef]);

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "hover:shadow-[0_0_5px_1px_#6D28D9]"
        )}
        ref={mergeRefs(ref, buttonRef)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
