import { ReactNode, Suspense } from 'react'
import LocaleSegmentLoading from '../../shared/ui/loading/loading'

//interface
interface ILayoutComponentProps {
  children: ReactNode
  type: 'public' | 'protected'
}

//component
const LayoutComponent = (props: ILayoutComponentProps) => {
  const { children, type } = props

  return (
    <Suspense fallback={<LocaleSegmentLoading/>}>
      <div className='relative z-0 flex min-h-dvh flex-col'>{children}</div>
    </Suspense>
  )
}

export default LayoutComponent
