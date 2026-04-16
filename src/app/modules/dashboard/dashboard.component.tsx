import { LanguagesIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { LanguageDropdownComponent } from '@/app/features/dropdown-language'
import { ProfileDropdownComponent } from '@/app/features/dropdown-profile'
import { ModeToggleComponent } from '@/app/features/mode-toggle'
import { HeaderBarComponent } from '@/app/widgets/header'
import { Button } from '@/pkg/theme/ui/button'

//interface
interface IDashboardLayoutProps {
  children: ReactNode
}

//component
const DashboardLayoutComponent = (props: IDashboardLayoutProps) => {
  const { children } = props

  //render
  return (
    <div className='flex min-h-dvh w-full flex-col'>
      <HeaderBarComponent>
        <LanguageDropdownComponent
          trigger={
            <Button data-testid='language-toggle' variant='ghost' size='icon'>
              <LanguagesIcon />
            </Button>
          }
        />
        <ModeToggleComponent />

        <ProfileDropdownComponent />
      </HeaderBarComponent>

      <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6'>{children}</main>

      <footer className='bg-card h-10 border-t'>
        <div className='mx-auto size-full max-w-7xl px-4 sm:px-6'>
          <div className='border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
        </div>
      </footer>
    </div>
  )
}

export default DashboardLayoutComponent
