import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/sonner" // Updated import path

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Notes App",
  description: "A simple notes app with AI-powered summarization",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" richColors /> {/* Updated Toaster */}
        </Providers>
      </body>
    </html>
  )
}