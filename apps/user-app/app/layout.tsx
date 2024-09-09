import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppbarClient } from "./components/AppbarClient";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "payTM",
  description: "Simple PayTM Wallet app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}
