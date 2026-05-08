import { useTranslations } from 'next-intl'
import { FC } from 'react'

import { IPokemonCardData } from '@/app/entities/models'

//interface
interface IProps {
  data: IPokemonCardData
}

//component
const CardBackComponent: FC<Readonly<IProps>> = (props) => {
  const { data } = props

  const t = useTranslations('card_component')

  //render
  return (
    <div className='absolute inset-0 flex h-full w-full [transform:rotateY(180deg)] flex-col rounded-3xl border-2 bg-slate-800 p-6 text-white shadow-inner [backface-visibility:hidden]'>
      <h3 className='mb-6 text-center text-xl font-black tracking-wider text-sky-400 uppercase'>{t('base_stat')}</h3>

      <div className='w-full space-y-4'>
        {data.stats?.map((stat) => (
          <div key={stat.stat.name} className='group/stat'>
            <div className='mb-1 flex justify-between text-[10px] font-bold text-slate-400 uppercase'>
              <span>{stat.stat.name.replace('-', ' ')}</span>

              <span className='text-white'>{stat.base_stat}</span>
            </div>

            <div className='h-1.5 w-full overflow-hidden rounded-full bg-slate-700'>
              <div
                className='h-full bg-sky-500 transition-all delay-300 duration-1000'
                style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='mt-auto w-full border-t border-slate-700 pt-4'>
        <div className='text-center text-[10px]'>
          <div className='flex flex-col items-center justify-between'>
            <span className='font-bold text-slate-400 uppercase'>{t('abilities')}</span>

            <span className='truncate capitalize'>{data.abilities?.map((a) => a.ability.name).join(', ') || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBackComponent
