import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
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
  title: 'PokeArchive',
  description: 'A complete guide to Pokémon with detailed stats and evolutionary chains.',
  icons: {
    icon: '/favicon.ico.svg',
  },
}

export default async function RootLayout(props: IProps) {
  const locale = await getLocale()
  const messages = await getMessages()

  const { children } = props

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
