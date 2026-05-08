import { type FC, type ReactNode } from 'react'

import { ThemeProvider } from '@/pkg/theme/providers'

import '@/config/styles/global.css'

// interface
interface IProps {
  children: ReactNode
}

// component
const RootLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  //render
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
