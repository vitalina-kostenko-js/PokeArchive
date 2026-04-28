'use client'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

//сomponent
const NotFoundComponent = () => {
  const t = useTranslations('notFound')

  //render
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <div className='mb-8 flex items-center justify-center select-none'>
        <span className='text-foreground text-[120px] leading-none font-extrabold md:text-[180px]'>4</span>

        <div className='animate-bounce-slow z-10 -mx-4 w-32 md:-mx-8 md:w-48'>
          <Image
            src='/images/not_found.svg'
            alt='Error illustration'
            width={200}
            height={420}
            unoptimized
            className='drop-shadow-2xl'
          />
        </div>

        <span className='text-foreground text-[120px] leading-none font-extrabold md:text-[180px]'>4</span>
      </div>

      <div className='space-y-4'>
        <h1 className='text-foreground flex items-center justify-center gap-2 text-2xl font-bold md:text-3xl'>
          {t('title')} <span className='text-xl'>⚠️</span>
        </h1>

        <p className='text-muted-foreground mx-auto max-w-xs'>{t('description')}</p>
      </div>

      <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
        <Button asChild size='lg' className='px-8'>
          <Link href='/'>{t('backToHome')}</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundComponent
