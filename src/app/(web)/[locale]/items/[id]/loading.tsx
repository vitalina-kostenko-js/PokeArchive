const ItemLoading = async () => {
  return (
    <>
      <div className='flex min-h-[40vh] flex-col items-center justify-center gap-4'>
        <div className='border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent' />

        <p className='text-muted-foreground'>Loading...</p>
      </div>
    </>
  )
}

export default ItemLoading
