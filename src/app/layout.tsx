import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ReactNode } from 'react'

import { ReactQueryProvider } from './shared/providers'

import '@/config/styles/global.css'

import { routing } from '../pkg/locale/routing'

//interface
interface IProps {
  children: ReactNode
}

//fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

//metadata
export const metadata: Metadata = {
  title: 'MyLibrary',
  description: 'MyLibrary is a library management system that allows you to manage your books and authors.',
  icons: {
    icon: '/favicon.ico.svg',
  },
}

//static params
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout(props: IProps) {
  const locale = await getLocale()
  const messages = await getMessages()

  const { children } = props

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
