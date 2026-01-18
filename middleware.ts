import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['fr', 'en', 'it', 'es'],

  // Used when no locale matches
  defaultLocale: 'fr',

  // Always use locale prefix in URL
  localePrefix: 'always'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en|it|es)/:path*']
};
