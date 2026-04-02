import { IPokemonCardData } from '@/app/shared/interfaces'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { FC } from 'react'

//interface
interface IProps {
  data: IPokemonCardData
}

//component
const CardComponent: FC<Readonly<IProps>> = (props) => {
  const { data } = props

  const t = useTranslations('card_component')

  return (
    <div className='group relative z-0 h-[400px] w-full [perspective:1000px] hover:z-50'>
      {/* message */}
      <div className='pointer-events-none absolute top-10 -right-4 z-50 translate-x-full opacity-0 transition-all delay-700 duration-300 group-hover:-right-2 group-hover:opacity-100'>
        <div className='relative rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold whitespace-nowrap text-white shadow-xl after:absolute after:top-1/2 after:right-full after:-translate-y-1/2 after:border-8 after:border-transparent after:border-r-slate-900 after:content-[""]'>
          {t('click_message')}
        </div>
      </div>

      {/* pokemon */}
      <div className='relative h-full w-full transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
        <div className='absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 bg-white p-6 [backface-visibility:hidden]'>
          <div className='relative mb-4 h-40 w-full transition-transform duration-300 group-hover:scale-110'>
            <Image src={data.sprite} alt={data.name} fill className='object-contain' unoptimized />
          </div>

          <h3 className='mb-4 text-center text-2xl font-black text-slate-800 capitalize'>{data.name}</h3>

          <div className='flex flex-wrap justify-center gap-2'>
            {data.types.map((type) => (
              <span
                key={`${type.slot}-${type.type.name}`}
                className='rounded-xl border px-4 py-1.5 text-xs font-bold uppercase shadow-sm'
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className='absolute inset-0 flex h-full w-full [transform:rotateY(180deg)] flex-col rounded-3xl border-2 bg-slate-800 p-6 text-white shadow-inner [backface-visibility:hidden]'>
          <h3 className='mb-6 text-center text-xl font-black tracking-wider text-sky-400 uppercase'>Base Stats</h3>

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

                <span className='truncate capitalize'>
                  {data.abilities?.map((a) => a.ability.name).join(', ') || '-'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardComponent
