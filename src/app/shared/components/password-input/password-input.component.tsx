'use client'

import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Input } from '@/pkg/theme/ui/input'
import { Button } from '@/pkg/theme/ui/button'

//component
const PasswordInputComponent = forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  //render
  return (
    <div className='relative'>
      <Input ref={ref} type={isVisible ? 'text' : 'password'} className='pr-10' {...props} />

      <Button
        type='button'
        onClick={() => setIsVisible(!isVisible)}
        className='absolute top-1/2 right-3 -translate-y-1/2'
        variant='ghost'
        size='icon'
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  )
})

PasswordInputComponent.displayName = 'PasswordInputComponent'

export default PasswordInputComponent
