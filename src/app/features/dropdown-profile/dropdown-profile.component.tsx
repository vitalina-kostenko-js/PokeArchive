'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { AuthButtonComponent } from '@/app/features/auth-button'
import { signOutAppAuth, useAuthSession } from '@/app/shared/hooks/auth-session'
import { useRouter } from '@/pkg/locale'
import { Avatar, AvatarFallback, AvatarImage } from '@/pkg/theme/ui/avatar'
import { Button } from '@/pkg/theme/ui/button'

import { ProfileMenuContentComponent } from './elements'

//component
const ProfileDropdownComponent = () => {
  const tLoading = useTranslations('loading')
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const { data } = useAuthSession()
  const user = data?.user

  if (user) {
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
          session={{ user }}
          onLogout={async () => {
            setIsSigningOut(true)
            try {
              await signOutAppAuth()

              router.push('/sign-in')

              router.refresh()
            } catch {
              setIsSigningOut(false)
            }
          }}
          trigger={
            <Button variant='ghost' size='icon'>
              <Avatar className='size-9.5 rounded-md'>
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>{user.name?.charAt(0).toUpperCase() ?? '?'}</AvatarFallback>
              </Avatar>
            </Button>
          }
        />
      </>
    )
  }

  //render
  return (
    <div className='flex items-center gap-1.5'>
      <AuthButtonComponent />
    </div>
  )
}

export default ProfileDropdownComponent
