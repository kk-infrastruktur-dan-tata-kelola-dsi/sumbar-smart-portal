import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-brand-rantau-500 to-brand-rantau-700",
      yellow: "from-brand-gold-400 to-brand-gold-600",
      blue: "from-brand-rantau-400 to-brand-rantau-700",
      cyan: "from-brand-rantau-300 to-brand-rantau-500",
      green: "from-brand-alam-300 to-brand-alam-600",
      pink: "from-brand-marawa-300 to-brand-marawa-600",
      foreground: "from-civic-text to-civic-textMuted",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});
