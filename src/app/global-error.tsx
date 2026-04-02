'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function GlobalError() {
  const t = useTranslations('notFound')

  return (
    <html>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center'>
          <div className='mb-8 flex items-center justify-center select-none'>
            <span className='text-[120px] font-extrabold leading-none text-black md:text-[180px]'>4</span>

            <div className='animate-bounce-slow z-10 -mx-4 w-32 md:-mx-8 md:w-48'>
              <Image
                src='/images/not_found.svg'
                alt='Error illustration'
                width={200}
                height={420}
                unoptimized
              />
            </div>

            <span className='text-[120px] font-extrabold leading-none text-black md:text-[180px]'>4</span>
          </div>

          <div className='space-y-4'>
            <h1 className='flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 md:text-3xl'>
              {t('title')} <span className='text-xl'>⚠️</span>
            </h1>
            <p className='mx-auto max-w-xs text-gray-500'>{t('description')}</p>
          </div>

          <div className='mt-10'>
            <Link
              href='/'
              className='inline-block rounded-lg bg-black px-8 py-3 font-medium text-white shadow-lg shadow-gray-200 transition-transform duration-200 hover:scale-105 active:scale-95'
            >
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}