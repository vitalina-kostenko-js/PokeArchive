import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import { EAssetImage } from '@/app/shared/interfaces'
import { envClient } from '@/config/env'
import { routing } from '@/pkg/locale'
import { ReactQueryProvider } from '@/pkg/theme/providers'
import { Toaster } from '@/pkg/theme/ui/sonner'

//interface
interface IProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

//static params
export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }))

//metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const title = 'PokeArchive'
  const description = 'A complete guide to Pokémon with detailed stats and evolutionary chains.'

  return {
    metadataBase: new URL(envClient.NEXT_PUBLIC_CLIENT_WEB_URL),
    keywords: ['pokemon', 'pokemon species', 'pokemon types'],
    icons: { icon: EAssetImage.FAVICON },
    title: { default: title, template: `%s | ${title}` },
    description,
    applicationName: title,
    openGraph: {
      title: { default: title, template: `%s | ${title}` },
      description,
      siteName: title,
      type: 'website',
      url: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
      images: [{ url: EAssetImage.OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
  }
}

//layout
const LocaleLayout = async (props: IProps) => {
  const {children, params } = props

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  
  const messages = await getMessages()

  //render
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        {children}
        <Toaster position='top-center' duration={3000} />
      </ReactQueryProvider>
    </NextIntlClientProvider>
  )
}

export default LocaleLayout