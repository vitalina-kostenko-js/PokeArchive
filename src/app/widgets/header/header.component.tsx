import { useTranslations } from 'next-intl'

import { FC, ReactNode } from 'react'
import { Link } from '../../../pkg/locale'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../pkg/theme/ui/breadcrumb'

//interface
interface IProps {
  children?: ReactNode
}

//component
const HeaderBarComponent: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('header')

  const { children } = props

  return (
    <header className='bg-card sticky top-0 z-50 border-b'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
        <div className='flex items-center gap-4'>
          <Breadcrumb className='hidden sm:block'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/'>{t('home')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/items'>{t('library')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='/favorite'>{t('favorite')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='flex items-center gap-1.5'>{children}</div>
      </div>
    </header>
  )
}

export default HeaderBarComponent
