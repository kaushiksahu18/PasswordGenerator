import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorColor?: string;
    indicatorText?: string;
  }
>(({ className, value, indicatorColor, indicatorText, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary text-center",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={`h-full w-full flex-1 4 ${
        indicatorColor || "bg-primary"
      } transition-all`}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
    <span className="uppercase absolute top-0 text-[13px] left-0 h-full w-full flex items-center justify-center">
      {indicatorText}
    </span>
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
