import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const loggedInRoutes = [
  "/data-pengurus",
  "/infaq",
  "/muzakki",
  "/mustahik",
  "/masyarakat",
  "/laporan",
  "/",
];

const loggedOutRoutes = ["/login"];

export default async function middleware(
  req: NextRequest,
): Promise<NextResponse> {
  if (
    !loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !loggedOutRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.next();
  } else {
    const myCookie = cookies();

    let token: string | null = null;
    if (myCookie.get("token")) {
      token = myCookie.get("token")!.value;
    }

    if (
      token &&
      loggedInRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
