"use client";
// import type { Metadata } from "next"
import "./globals.css";
import NavBar from "../components/ui/NavBar";
import Footer from "../components/Footer";
import Toastify from "@/components/Toastify";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter", // optional for CSS variable usage
});

// export const metadata: Metadata = {
//   title: "Experience Rwanda - Your Gateway to Unforgettable Adventures",
//   description:
//     "Discover and book unforgettable Rwandan adventures, from gorilla trekking to cultural tours, with Experience Rwanda—your gateway to seamless travel.",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en" className={inter.className}>
      <body className={`antialiased flex flex-col min-h-screen`}>
        <Suspense fallback={null}>
          <Toastify />
          {!isAdminRoute && <NavBar />}{" "}
          <main className="flex-grow">{children}</main>
          {!isAdminRoute && <Footer />}{" "}
        </Suspense>
      </body>
    </html>
  );
}
