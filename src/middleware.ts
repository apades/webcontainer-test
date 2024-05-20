import acceptLanguage from 'accept-language'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { Language, locales } from './utils/lang'
acceptLanguage.languages(locales)

/**保底语言 */
const DEFAULT_LANG = Language.English
/**没有一级语言路由时，使用用户的cookie保存的语言 */
const DYNAMIC_LANG_COOKIE = 'lang'

export function middleware(request: NextRequest) {
  const { pathname, searchParams, href } = request.nextUrl

  let locale = pathname.split('/')[1]
  const isDynamicLocale = !locales.includes(locale)

  let resp: NextResponse<unknown>
  // 如果访问的是/apps/xx，则返回cookies里的lang，保底为en
  if (isDynamicLocale) {
    const cookieLang = request.cookies
      .get(DYNAMIC_LANG_COOKIE)
      ?.value.replace('_', '-')
    let headerAcceptLang = ''
    if (!cookieLang) {
      headerAcceptLang =
        acceptLanguage.get(request.headers.get('Accept-Language')) ||
        DEFAULT_LANG
    }
    locale = cookieLang ?? headerAcceptLang
    resp = NextResponse.rewrite(new URL(`/${locale}` + pathname, request.url))
    if (!cookieLang && headerAcceptLang) {
      resp.cookies.set(DYNAMIC_LANG_COOKIE, locale, {
        maxAge: 60 * 60 * 24 * 365,
      })
    }
  }
  // 如果访问的是/zh-CN/apps/xx，则返回zh-CN
  else {
    resp = NextResponse.next()
  }

  resp.headers.set('X-NEXT-INTL-LOCALE', locale)
  resp.cookies.set('NEXT_LOCALE', locale)

  resp.headers.set('X-FULL-PATHNAME', pathname)
  resp.headers.set('X-FULL-SQ', searchParams.toString())

  return resp
}

export const config = {
  matcher: ['/((?!/api|/_next|.*\\..*).*)'],
}
