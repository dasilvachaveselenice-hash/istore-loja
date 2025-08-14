import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'iStore - iPhone 16 + Linha Completa Apple | Menores Preços do Brasil',
  description: 'Loja oficial Apple com iPhone 16, iPad, MacBook, Apple Watch e AirPods. Frete grátis, 12x sem juros e garantia Apple.',
  keywords: 'iPhone 16, Apple, iPad, MacBook, Apple Watch, AirPods, loja Apple, iPhone Brasil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
