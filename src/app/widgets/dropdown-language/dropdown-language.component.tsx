'use client'

import { useLocale } from 'next-intl'
import type { ReactNode } from 'react'
import { useEffect, useState, useTransition } from 'react'

import { useSearchParams } from 'next/navigation'
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

  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()
  const [language, setLanguage] = useState(locale)

  useEffect(() => {
    setLanguage(locale)
  }, [locale])

  const handleChange = (value: string) => {
    setLanguage(value)

    const localePrefix = new RegExp(`^/(${LOCALES.map((l) => l.value).join('|')})(/|$)`)
    const cleanPath = pathname.replace(localePrefix, '/') || '/'

    const params = searchParams.toString()
    const fullPath = params ? `${cleanPath}?${params}` : cleanPath

    startTransition(() => {
      router.replace(fullPath, { locale: value })
    })
  }

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild disabled={isPending}>
        {trigger}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={language} onValueChange={handleChange}>
          {LOCALES.map(({ value, label }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdownComponent
