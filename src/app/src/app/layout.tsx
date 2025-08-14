import './globals.css'

export const metadata = {
  title: 'iStore - iPhone 16 + Linha Completa Apple',
  description: 'Loja Apple com iPhone 16, iPad, MacBook, Apple Watch e AirPods',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
