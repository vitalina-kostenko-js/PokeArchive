'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { signOutAppAuth, useAuthSession } from '@/app/shared/hooks'
import { useRouter } from '@/pkg/locale'

import { Avatar, AvatarFallback, AvatarImage } from '../../../../pkg/theme/ui/avatar'
import { Button } from '../../../../pkg/theme/ui/button'
import { LoginButtonComponent, RegisterButtonComponent } from '../auth-button'
import ProfileMenuContentComponent from './profile-menu-content.component'

const ProfileDropdownComponent = () => {
  const tLoading = useTranslations('loading')
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const params = useParams()
  const locale = (params.locale as string) ?? 'en'

  const { session, isPending } = useAuthSession()

  if (isPending) {
    return <div>{tLoading('loading')}</div>
  }

  if (session?.user) {
    const callbackUrl = `/${locale}`

    return (
      <>
        {isSigningOut && (
          <div
            className='bg-background/80 fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm'
            role='status'
            aria-live='polite'
          >
            <div className='flex flex-col items-center gap-3'>
              <div className='border-primary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent' />
              <p className='text-muted-foreground text-sm'>{tLoading('signingOut')}</p>
            </div>
          </div>
        )}

        <ProfileMenuContentComponent
          session={session}
          onLogout={async () => {
            setIsSigningOut(true)
            try {
              await signOutAppAuth()
              router.push(callbackUrl)
              router.refresh()
            } catch {
              setIsSigningOut(false)
            }
          }}
          trigger={
            <Button variant='ghost' size='icon'>
              <Avatar className='size-9.5 rounded-md'>
                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      </>
    )
  }

  return (
    <div className='flex items-center gap-1.5'>
      <LoginButtonComponent />

      <RegisterButtonComponent />
    </div>
  )
}

export default ProfileDropdownComponent
