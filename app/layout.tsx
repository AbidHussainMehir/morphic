import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Sidebar } from '@/components/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'
import { ThirdwebProvider } from 'thirdweb/react'
import Head from 'next/head'

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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800&family=Roboto+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        style={{
          fontFamily: 'Jost, sans-serif'
        }}
      >
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
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
