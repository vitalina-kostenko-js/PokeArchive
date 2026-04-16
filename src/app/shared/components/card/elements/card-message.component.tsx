import { useTranslations } from 'next-intl'

//interface
interface IProps {}

//component
const CardMessageComponent = () => {
  const t = useTranslations('card_component')

  //render
  return (
    <div className='pointer-events-none absolute -top-12 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all delay-700 duration-300 group-hover:-top-14 group-hover:opacity-100 group-active:hidden'>
      <div className='bg-popover text-popover-foreground after:border-t-popover relative rounded-lg border px-3 py-2 text-[10px] font-bold whitespace-nowrap shadow-xl after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:content-[""]'>
        {t('click_message')}
      </div>
    </div>
  )
}

export default CardMessageComponent
