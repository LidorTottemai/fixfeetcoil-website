import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API routes, unlock page
  const isExempt =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.endsWith("/unlock") ||
    pathname === "/unlock";

  const sitePassword = process.env.SITE_PASSWORD;

  if (sitePassword && !isExempt) {
    const authCookie = request.cookies.get("site-auth");
    if (!authCookie || authCookie.value !== sitePassword) {
      const locale = pathname.startsWith("/en") ? "en" : "he";
      const unlockUrl = new URL(
        locale === "en" ? "/en/unlock" : "/unlock",
        request.url
      );
      return NextResponse.redirect(unlockUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
