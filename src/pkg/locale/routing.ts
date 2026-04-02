import { defineRouting } from 'next-intl/routing'

// routing
export const routing = defineRouting({
  locales: ['en', 'de'],
  localeDetection: false,
  defaultLocale: 'en',
  localePrefix: 'always',
})
