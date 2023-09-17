import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { AppStateProvider } from "@/state/AppStateProvider";

import { Header } from "@/components/header/Header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import localFont from "next/font/local";

const mainFont = localFont({
  src: "./fonts/Helvetica_Regular.otf",
  variable: "--Helvetica",
});

export const metadata: Metadata = {
  title: "Armageddon V3",
  description: "Онлайн-сервис по мониторингу и уничтожению опасных астероидов",
};

// TODO: Fix types
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <AppStateProvider>
        <body className={mainFont.variable}>
          <Header />
          {children}
        </body>
      </AppStateProvider>
    </html>
  );
}
