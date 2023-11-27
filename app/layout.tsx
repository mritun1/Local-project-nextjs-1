import './styles/scss/global.scss'
import type { Metadata } from "next"

export const metadata:Metadata = {
  manifest: "/manifest.webmanifest"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>

  )
}
