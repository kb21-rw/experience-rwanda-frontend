import type { Metadata } from "next"
import "./globals.css"
import NavBar from "../components/ui/NavBar"
import Footer from "../components/Footer"
import Toastify from "@/components/Toastify"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Experience Rwanda - Your Gateway to Unforgettable Adventures",
  description:
    "Discover and book unforgettable Rwandan adventures, from gorilla trekking to cultural tours, with Experience Rwanda—your gateway to seamless travel.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col min-h-screen`}>
        <Suspense fallback={null}>
          <Toastify />
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  )
}
