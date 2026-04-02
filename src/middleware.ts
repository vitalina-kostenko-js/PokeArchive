import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

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
  const user = await getSessionPayloadFromRequest(req)

  const parts = pathname.split('/').filter(Boolean)
  const itemsIdx = parts.indexOf('items')
  const isItemsListOnly = itemsIdx !== -1 && itemsIdx === parts.length - 1

  const isSignIn = pathname === '/sign-in'
  const isSignUp = pathname === '/sign-up' 

  if (isItemsListOnly && !user) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  if (isSignIn && user) {
    return NextResponse.redirect(new URL('/items', req.url))
  }

  if (isSignUp && user) {
    return NextResponse.redirect(new URL('/items', req.url))
  }

  return i18nRes
}

export const config = {
  matcher: [
    '/((?!_next|_next/static|_next/image|_vercel|static|.well-known|fonts|sitemap|images|icons|robots|webmanifest|.*\\.xml$|.*\\.webp$|.*\\.avif$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.ico$|.*\\.svg$|.*\\.txt$|.*\\.js$|.*\\.css$).*)',
  ],
}
