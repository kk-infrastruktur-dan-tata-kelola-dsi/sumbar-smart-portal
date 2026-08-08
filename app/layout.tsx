import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Suspense } from "react";

import { Providers } from "./providers";

import { fontMono, fontSans } from "@/config/fonts";
import AiAssistant from "@/components/AiAssistant";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import TopProgress from "@/components/TopProgress";
import { TTSProvider } from "@/contexts/TTSContext";

export const metadata: Metadata = {
  title: "Sumbar Smart Portal",
  description: "Sumbar Smart Portal",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="id">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "light",
            enableSystem: false,
          }}
        >
          <TTSProvider>
            <div className="flex flex-col min-h-screen">
              {/* Global top loading indicator for route transitions */}
              <Suspense fallback={null}>
                <TopProgress />
              </Suspense>
              <Navbar />
              <main className="flex-1">
                <AiAssistant />
                {children}
              </main>
              <Footer />
            </div>
          </TTSProvider>
        </Providers>
      </body>
    </html>
  );
}
