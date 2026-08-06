import {
  Geist_Mono as FontMono,
  Plus_Jakarta_Sans as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
