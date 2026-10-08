import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { ModalProvider } from "./components/modal";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";

import AppProvider from "@/providers/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lemida",
  description: "Plataforma educacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="pt-BR"
      className={roboto.className}
    >
      <body>
        <ModalProvider>
          <AuthProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </AuthProvider>
        </ModalProvider>
      </body>
    </html>
  );
}
