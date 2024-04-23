import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tudo App",
  description: "Tudo is a simple web application for managing tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="fixed left-[-5rem] bottom-[-2rem] bg-gradient-to-r from-blue-300 to-blue-600 h-96 w-96 rounded-[4rem] rotate-[60deg] z-[-1]" />
        <div className="fixed top-[-5rem] right-[-5rem] bg-gradient-to-r from-blue-300 to-blue-600 h-96 w-96 rounded-[4rem] rotate-[40deg] z-[-1]" />
        {children}</body>
    </html>
  );
}
