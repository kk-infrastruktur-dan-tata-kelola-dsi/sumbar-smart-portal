import { NextResponse, type NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

// Exclude Next.js internals and static assets from middleware
export const config = {
  // Exclude ALL API routes and Next internals from middleware
  // to avoid interfering with route handlers (including POST requests).
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
