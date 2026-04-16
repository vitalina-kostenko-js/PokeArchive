import { ITEMS_PAGE_LOADING } from '@/app/shared/constants/loading'
import { SkeletonRendererComponent } from '@/app/shared/ui/skeleton-render'

//loading
const ItemLoading = () => {
  //render
  return (
    <div className='flex flex-1 flex-col gap-6 py-4'>
      <SkeletonRendererComponent model={ITEMS_PAGE_LOADING} />
    </div>
  )
}

export default ItemLoading
