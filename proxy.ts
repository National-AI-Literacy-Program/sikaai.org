import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing, LOCALE_PREFIX  } from './i18n/routing';

const intl = createMiddleware(routing);

const MAIN_SITE = 'https://sikaai.org';
const LEARN_ROUTES = ['/course', '/certificate', '/involve'];

function splitLocale(pathname: string) {
  for (const locale of routing.locales) {
    const prefix = LOCALE_PREFIX[locale];
    if (pathname === prefix) return { locale, prefix, path: '/' };
    if (pathname.startsWith(`${prefix}/`))
      return { locale, prefix, path: pathname.slice(prefix.length) };
  }
  return { locale: null, prefix: '', path: pathname };
}

const isLearnRoute = (path: string) =>
  LEARN_ROUTES.some((r) => path === r || path.startsWith(`${r}/`));

export default function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const isLearnHost = host.startsWith('learn.');
 const { prefix, path } = splitLocale(req.nextUrl.pathname);


  if (isLearnHost) {
   
  if (path === '/') {
  const url = req.nextUrl.clone();
  url.pathname = `${prefix}/involve`;
  return NextResponse.redirect(url);
}

    if (!isLearnRoute(path)) {
      return NextResponse.redirect(new URL(req.nextUrl.pathname + req.nextUrl.search, MAIN_SITE));
    }
  } else if (isLearnRoute(path)) {
 
    const url = req.nextUrl.clone();
    url.host = 'learn.' + host.replace(/^www\./, '');
    return NextResponse.redirect(url);
  }

  return intl(req);
}

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
};