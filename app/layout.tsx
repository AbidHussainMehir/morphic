import type { Metadata, Viewport } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'
import { ThirdwebProvider } from 'thirdweb/react'
import { useEffect } from 'react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const title = 'Athena'
const description =
  'The AI-powered search engine that rewards you to learn and grow.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theathena.ai'),
  title,
  description,
  openGraph: {
    title,
    description
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@abid'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  // useEffect(() => {
  //   // Ensure the _mtm array exists on the window object
  //   window._mtm = window._mtm || []
  //   window._mtm.push({
  //     'mtm.startTime': new Date().getTime(),
  //     event: 'mtm.Start'
  //   })
  //   const d = document
  //   const g = d.createElement('script')
  //   const s = d.getElementsByTagName('script')[0]
  //   g.async = true
  //   g.src =
  //     'https://cdn.matomo.cloud/theathenaai.matomo.cloud/container_XxF5vFEJ.js'
  //   if (s && s.parentNode) {
  //     s.parentNode.insertBefore(g, s)
  //   }
  // }, [])
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppStateProvider>
              <Header />
              {children}
              <Sidebar />
              <Footer />
              <Toaster />
            </AppStateProvider>
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
