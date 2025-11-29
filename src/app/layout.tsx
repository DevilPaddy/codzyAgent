import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "./globals.css";
import { AuthProvider } from "./providers";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codzy",
  description: "Generate your website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable}`}
      >
        <ReactLenis root />
        <AuthProvider>
        <div className="fixed top-0 left-0 w-full max-h-[4rem] z-50">
          <Navbar />
        </div>
        <div className="mb-[4rem] mx-auto">
          
            {children}
          
        </div>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}