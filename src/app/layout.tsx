import type { Metadata, ResolvingMetadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { getConfig } from "@/lib/yaml"

const inter = Inter({ subsets: ["latin"] })

export const generateMetadata = (): Metadata => {
  const { title, description } = getConfig()
  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
