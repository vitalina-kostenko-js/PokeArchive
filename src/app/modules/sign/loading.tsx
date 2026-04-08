import { getTranslations } from 'next-intl/server'

const LocaleSegmentLoading = async () => {
  const t = await getTranslations('loading')

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4'>
      <div className='border-primary h-10 w-10 animate-spin rounded-full border-2 border-t-transparent' />

      <p className='text-muted-foreground text-sm'>{t('loading')}</p>
    </div>
  )
}

export default LocaleSegmentLoading
