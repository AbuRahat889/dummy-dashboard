import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Role access configuration
const roleAccess: Record<string, string[]> = {
  ADMIN: [
    "/",
    "/product-list",
    "/order-list",
    "/category-management",
    "/reviews",
  ],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (!role) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const allowedRoutes = roleAccess[role] || [];

  const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/",
    "/product-list",
    "/order-list",
    "/category-management",
    "/reviews",
  ],
};
