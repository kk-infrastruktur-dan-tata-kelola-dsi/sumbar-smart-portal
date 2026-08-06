export const designTokens = {
  meta: {
    name: "Sumbar Smart Portal civic design tokens",
    version: "0.1.0",
    updatedAt: "2026-06-23",
    intent:
      "A calm, official, Minangkabau-informed public service system for West Sumatra.",
  },

  color: {
    brand: {
      // Songket-inspired civic gold. Use as the primary official accent.
      gold50: "#FFF8E6",
      gold100: "#FBECC4",
      gold200: "#F4D58B",
      gold300: "#E8B94D",
      gold400: "#D69A1B",
      gold500: "#B77A0B",
      gold600: "#8A5A08",
      gold700: "#624006",
      gold800: "#3E2904",
      gold900: "#241802",

      // Deep marawa red. Reserve for heritage emphasis, warnings, and anti-hoax.
      marawa50: "#FFF1EF",
      marawa100: "#FFD8D2",
      marawa200: "#F6A89E",
      marawa300: "#EA7568",
      marawa400: "#D9483B",
      marawa500: "#B92D24",
      marawa600: "#912019",
      marawa700: "#6D1712",
      marawa800: "#47100C",
      marawa900: "#280806",

      // Highland green. Use for culture, maps, success, environment.
      alam50: "#EEF8F1",
      alam100: "#D6EEDC",
      alam200: "#ACD8B9",
      alam300: "#7CBE92",
      alam400: "#529E70",
      alam500: "#357F57",
      alam600: "#286443",
      alam700: "#204D36",
      alam800: "#193B2A",
      alam900: "#10271C",

      // Coast and lake blue. Use for information, data links, and chart series.
      rantau50: "#EEF8FA",
      rantau100: "#D4EDF2",
      rantau200: "#A4D7E2",
      rantau300: "#6FBCCE",
      rantau400: "#429DB4",
      rantau500: "#277F96",
      rantau600: "#1F6578",
      rantau700: "#1B5060",
      rantau800: "#173F4C",
      rantau900: "#102B35",
    },

    neutral: {
      paper: "#F8F5ED",
      paperWarm: "#F3EFE4",
      limestone: "#E8E1D4",
      mist: "#F4F6F7",
      cloud: "#FFFFFF",
      line: "#D8D3C8",
      lineStrong: "#BEB6A8",
      text: "#18212B",
      textMuted: "#5D6673",
      textSubtle: "#7C8490",
      inverse: "#F9FAFB",
      charcoal: "#121A22",
      footer: "#172331",
    },

    semantic: {
      primary: "#B77A0B",
      primaryForeground: "#FFFFFF",
      primarySoft: "#FFF8E6",
      danger: "#B92D24",
      dangerForeground: "#FFFFFF",
      warning: "#D69A1B",
      warningForeground: "#18212B",
      success: "#357F57",
      successForeground: "#FFFFFF",
      info: "#277F96",
      infoForeground: "#FFFFFF",
      focus: "#1F6578",
    },
  },

  typography: {
    fontFamily: {
      sans: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
      display: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
      mono: '"Geist Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace',
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    lineHeight: {
      tight: "1.12",
      heading: "1.2",
      body: "1.65",
      compact: "1.45",
    },
    letterSpacing: {
      normal: "0",
      tight: "-0.01em",
      label: "0.04em",
    },
  },

  space: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
  },

  radius: {
    none: "0",
    xs: "0.25rem",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
    full: "9999px",
  },

  shadow: {
    none: "none",
    xs: "0 1px 2px rgb(24 33 43 / 0.06)",
    sm: "0 4px 12px rgb(24 33 43 / 0.08)",
    md: "0 12px 28px rgb(24 33 43 / 0.10)",
    focus: "0 0 0 3px rgb(31 101 120 / 0.28)",
  },

  layout: {
    container: {
      content: "1200px",
      wide: "1320px",
      prose: "760px",
    },
    pagePadding: {
      mobile: "1.5rem",
      tablet: "2rem",
      desktop: "2.5rem",
    },
    sectionGap: {
      mobile: "3rem",
      desktop: "4.5rem",
    },
  },

  motion: {
    duration: {
      fast: "120ms",
      base: "180ms",
      slow: "260ms",
    },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },

  zIndex: {
    base: 0,
    sticky: 20,
    dropdown: 30,
    overlay: 40,
    modal: 50,
    toast: 60,
  },
} as const;

export type DesignTokens = typeof designTokens;

