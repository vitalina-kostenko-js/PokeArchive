import { LanguagesIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '../../../pkg/locale'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../pkg/theme/ui/breadcrumb'
import { Button } from '../../../pkg/theme/ui/button'
import { LanguageDropdownComponent, ProfileDropdownComponent } from '../../shared/ui/dropdown-propfile'

//interface
interface IProps {}

//component
const HeaderBarComponent = () => {
  const t = useTranslations('header')

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
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='flex items-center gap-1.5'>
          <LanguageDropdownComponent
            trigger={
              <Button data-testid='language-toggle' variant='ghost' size='icon'>
                <LanguagesIcon />
              </Button>
            }
          />
          <ProfileDropdownComponent />
        </div>
      </div>
    </header>
  )
}

export default HeaderBarComponent
