import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("Session:", session);

  // Paths that require authentication
  const protectedPaths = ["/dashboard", "/notes"];
  const isProtectedPath = protectedPaths.some(
    (path) =>
      req.nextUrl.pathname === path ||
      req.nextUrl.pathname.startsWith(`${path}/`)
  );

  // If user is not authenticated and trying to access protected routes
  if (!session && isProtectedPath) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and trying to access auth pages
  if (
    session &&
    (req.nextUrl.pathname === "/auth" || req.nextUrl.pathname === "/")
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/notes";
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/", "/auth", "/dashboard/:path*", "/notes/:path*"],
};
