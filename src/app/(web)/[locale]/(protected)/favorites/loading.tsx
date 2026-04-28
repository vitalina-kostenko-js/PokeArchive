import { SkeletonRendererComponent } from '@/app/shared/components/skeleton-render'
import { CARD_SKELETON_MODEL } from '@/app/shared/constants/loading'

//loading
const FavoritesLoading = () => {
  //render
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonRendererComponent key={i} model={CARD_SKELETON_MODEL} />
      ))}
    </div>
  )
}

export default FavoritesLoading
