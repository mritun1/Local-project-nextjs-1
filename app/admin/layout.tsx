import '../styles/scss/global.scss'
import '../styles/scss/admin.scss'

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
