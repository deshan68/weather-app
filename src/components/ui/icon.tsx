import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconVariants = cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      sm: "w-3 h-3",
      md: "w-5 h-5",
      lg: "w-7 h-7",
      xl: "w-9 h-9",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      destructive: "text-destructive",
    },
    background: {
      none: "",
      muted: "bg-muted",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-white",
    },
    padding: {
      none: "",
      sm: "p-1",
      md: "p-1.5",
      lg: "p-2",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
    background: "none",
    padding: "none",
    rounded: "none",
  },
});

interface IconProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof iconVariants> {
  asChild?: boolean;
}

const Icon = React.forwardRef<HTMLElement, IconProps>(
  (
    {
      className,
      size,
      color,
      background,
      padding,
      rounded,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        ref={ref}
        className={cn(
          iconVariants({
            size,
            color,
            background,
            padding,
            rounded,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants };
