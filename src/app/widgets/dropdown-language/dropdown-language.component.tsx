'use client'

import { useLocale } from 'next-intl'
import type { ReactNode } from 'react'
import { useEffect, useState, useTransition } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'

import { usePathname, useRouter } from '../../../pkg/locale'

const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
]

interface ILanguageDropdownProps {
  trigger: ReactNode
  defaultOpen?: boolean
  align?: 'start' | 'center' | 'end'
}

const LanguageDropdownComponent = (props: ILanguageDropdownProps) => {
  const { trigger, defaultOpen, align = 'end' } = props

  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const [language, setLanguage] = useState(locale)

  useEffect(() => {
    setLanguage(locale)
  }, [locale])

  const handleChange = (value: string) => {
    setLanguage(value)

    startTransition(() => {
      router.replace(pathname, { locale: value })
    })
  }

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild disabled={isPending}>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md'
        align={align}
      >
        <DropdownMenuRadioGroup value={language} onValueChange={handleChange}>
          {LOCALES.map(({ value, label }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className='relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-gray-100 data-[state=checked]:font-bold'
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdownComponent
