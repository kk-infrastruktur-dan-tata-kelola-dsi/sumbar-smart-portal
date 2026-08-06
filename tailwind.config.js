const { heroui } = require("@heroui/theme");

const colors = {
  brand: {
    gold: {
      50: "#FFF8E6",
      100: "#FBECC4",
      200: "#F4D58B",
      300: "#E8B94D",
      400: "#D69A1B",
      500: "#B77A0B",
      600: "#8A5A08",
      700: "#624006",
      800: "#3E2904",
      900: "#241802",
    },
    marawa: {
      50: "#FFF1EF",
      100: "#FFD8D2",
      200: "#F6A89E",
      300: "#EA7568",
      400: "#D9483B",
      500: "#B92D24",
      600: "#912019",
      700: "#6D1712",
      800: "#47100C",
      900: "#280806",
    },
    alam: {
      50: "#EEF8F1",
      100: "#D6EEDC",
      200: "#ACD8B9",
      300: "#7CBE92",
      400: "#529E70",
      500: "#357F57",
      600: "#286443",
      700: "#204D36",
      800: "#193B2A",
      900: "#10271C",
    },
    rantau: {
      50: "#EEF8FA",
      100: "#D4EDF2",
      200: "#A4D7E2",
      300: "#6FBCCE",
      400: "#429DB4",
      500: "#277F96",
      600: "#1F6578",
      700: "#1B5060",
      800: "#173F4C",
      900: "#102B35",
    },
  },
  civic: {
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
};

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        civic: "0.5rem",
        "civic-lg": "0.75rem",
        "civic-xl": "1rem",
      },
      boxShadow: {
        "civic-xs": "0 1px 2px rgb(24 33 43 / 0.06)",
        "civic-sm": "0 4px 12px rgb(24 33 43 / 0.08)",
        "civic-md": "0 12px 28px rgb(24 33 43 / 0.10)",
        "civic-focus": "0 0 0 3px rgb(31 101 120 / 0.28)",
      },
      maxWidth: {
        "civic-content": "1200px",
        "civic-wide": "1320px",
        "civic-prose": "760px",
      },
      transitionDuration: {
        civic: "180ms",
      },
      transitionTimingFunction: {
        civic: "cubic-bezier(0.2, 0, 0, 1)",
        "civic-emphasized": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: colors.civic.paper,
            foreground: colors.civic.text,
            default: {
              50: colors.civic.cloud,
              100: colors.civic.mist,
              200: colors.civic.limestone,
              300: colors.civic.line,
              400: colors.civic.lineStrong,
              500: colors.civic.textSubtle,
              600: colors.civic.textMuted,
              700: colors.civic.text,
              800: colors.civic.charcoal,
              900: colors.civic.footer,
              DEFAULT: colors.civic.mist,
              foreground: colors.civic.text,
            },
            primary: {
              50: colors.brand.gold[50],
              100: colors.brand.gold[100],
              200: colors.brand.gold[200],
              300: colors.brand.gold[300],
              400: colors.brand.gold[400],
              500: colors.brand.gold[500],
              600: colors.brand.gold[600],
              700: colors.brand.gold[700],
              800: colors.brand.gold[800],
              900: colors.brand.gold[900],
              DEFAULT: colors.semantic.primary,
              foreground: colors.semantic.primaryForeground,
            },
            warning: {
              DEFAULT: colors.semantic.warning,
              foreground: colors.semantic.warningForeground,
            },
            danger: {
              DEFAULT: colors.semantic.danger,
              foreground: colors.semantic.dangerForeground,
            },
            success: {
              DEFAULT: colors.semantic.success,
              foreground: colors.semantic.successForeground,
            },
            secondary: {
              DEFAULT: colors.semantic.info,
              foreground: colors.semantic.infoForeground,
            },
            focus: colors.semantic.focus,
          },
        },
        dark: {
          colors: {
            background: colors.civic.footer,
            foreground: colors.civic.inverse,
            primary: {
              DEFAULT: colors.brand.gold[300],
              foreground: colors.brand.gold[900],
            },
            warning: {
              DEFAULT: colors.brand.gold[300],
              foreground: colors.brand.gold[900],
            },
            danger: {
              DEFAULT: colors.brand.marawa[300],
              foreground: colors.brand.marawa[900],
            },
            success: {
              DEFAULT: colors.brand.alam[300],
              foreground: colors.brand.alam[900],
            },
            secondary: {
              DEFAULT: colors.brand.rantau[300],
              foreground: colors.brand.rantau[900],
            },
            focus: colors.brand.rantau[300],
          },
        },
      },
    }),
  ],
};

module.exports = config;
