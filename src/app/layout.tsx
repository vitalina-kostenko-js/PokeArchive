import { getLocale } from 'next-intl/server'

import { fontPrimary, fontSecondary } from '@/config/fonts'
import '@/config/styles/global.css'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
}

//root layout
const RootLayout = async(props: IProps) => {
  const { children } = props

  const locale = await getLocale()

  //render
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontPrimary.className} ${fontSecondary.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
