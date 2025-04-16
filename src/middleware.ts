// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(function middleware(req) {
//   const isLoggedIn = !!req.nextauth.token;
//   const isAuthPage = req.nextUrl.pathname.startsWith("/login");

//   if (isLoggedIn && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }
// });

// export const config = {
//   matcher: ["/dashboard/:path*", "/editor/:path*"],
// };

import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });

    const isLoggedIn = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isLoggedIn && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!isLoggedIn && !isAuthPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
};
