import { useTranslations } from 'next-intl'
import { FC } from 'react'

//interface
interface IProps {
  weight?: number
  height?: number
}

//component
const ProfileStatsComponent: FC<Readonly<IProps>> = (props) => {
  const t = useTranslations('card_profile')

  const { weight, height } = props

  return (
    <div className='grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-gray-700'>
      <div className='text-center md:text-left'>
        <p className='text-xs font-bold text-gray-400 uppercase'>{t('weight')}</p>

        <p className='text-lg font-medium dark:text-white'>{(weight ?? 0) / 10} kg</p>
      </div>

      <div className='text-center md:text-left'>
        <p className='text-xs font-bold text-gray-400 uppercase'>{t('height')}</p>

        <p className='text-lg font-medium dark:text-white'>{(height ?? 0) / 10} m</p>
      </div>
    </div>
  )
}

export default ProfileStatsComponent
