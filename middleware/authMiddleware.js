import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protect dashboard & API routes
  const protectedPaths = ["/dashboard", "/api/posts", "/api/blog"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (!pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    const response = pathname.startsWith("/api")
      ? NextResponse.json({ message: "Invalid token" }, { status: 401 })
      : NextResponse.redirect(new URL("/login", req.url));
    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/posts/:path*", "/api/blog/:path*"],
};
