import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { LanguageDropdownComponent } from '@/app/shared/components/dropdown-language'
import { ProfileDropdownComponent } from '@/app/shared/components/dropdown-profile'
import { ModeToggleComponent } from '@/app/shared/components/mode-toggle'
import { Link } from '@/pkg/locale'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/pkg/theme/ui/breadcrumb'
import { Button } from '@/pkg/theme/ui/button'
import { LanguagesIcon } from 'lucide-react'

//interface
interface IProps {}

//component
const HeaderBarComponent: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('header')

  //render
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
                  <Link href='/favorites'>{t('favorite')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='flex items-center gap-2'>
          <LanguageDropdownComponent
            trigger={
              <Button data-testid='language-toggle' variant='ghost' size='icon'>
                <LanguagesIcon />
              </Button>
            }
          />
          <ModeToggleComponent />
          
          <ProfileDropdownComponent />
        </div>
      </div>
    </header>
  )
}

export default HeaderBarComponent
