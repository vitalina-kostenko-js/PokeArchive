import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { getSessionPayloadFromRequest } from '@/pkg/auth/session-from-request'
import { routing } from '@/pkg/locale'

export default async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/') || req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.next()
  }

  const i18nRes = createMiddleware(routing)(req)

  const country =
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    req.headers.get('X-Country') ||
    req.cookies.get('country')?.value ||
    'N/A'

  i18nRes.headers.set('x-country', country)
  i18nRes.cookies.set('x-country', country)

  const pathname = req.nextUrl.pathname

  const parts = pathname.split('/').filter(Boolean)
  const itemsIdx = parts.indexOf('items')
  const isItemsListOnly = itemsIdx !== -1 && itemsIdx === parts.length - 1

  const localeRegex = new RegExp(`^\\/(${routing.locales.join('|')})`)
  const strippedPath = pathname.replace(localeRegex, '') || '/'

  const isSignIn = strippedPath === '/sign-in'
  const isSignUp = strippedPath === '/sign-up'

  const locale = parts[0] || 'en'

  const isProtectedRoute = strippedPath.startsWith('/items') || strippedPath.startsWith('/favorites')

  if (isProtectedRoute) {
    const user = await getSessionPayloadFromRequest(req)

    if (!user) {
      return NextResponse.redirect(new URL(`/${locale}/sign-in`, req.url))
    }
  }

  if (isSignIn) {
    const user = await getSessionPayloadFromRequest(req)

    if (user) {
      return NextResponse.redirect(new URL(`/${locale}/items`, req.url))
    }
  }

  if (isSignUp) {
    const user = await getSessionPayloadFromRequest(req)

    if (user) {
      return NextResponse.redirect(new URL(`/${locale}/items`, req.url))
    }
  }

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
