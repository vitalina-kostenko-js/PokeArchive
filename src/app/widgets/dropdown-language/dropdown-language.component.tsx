'use client'

import { useLocale } from 'next-intl'
import type { ReactNode } from 'react'
import { useEffect, useState, useTransition } from 'react'

import { usePathname, useRouter } from '../../../pkg/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../../../pkg/theme/ui/dropdown-menu'

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

      <DropdownMenuContent align={align}>
        <DropdownMenuRadioGroup value={language} onValueChange={handleChange}>
          {LOCALES.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value} className='cursor-pointer'>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdownComponent
