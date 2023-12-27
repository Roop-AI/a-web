import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isNewUser = request?.cookies.get("isNewUser");
  const userToken = request?.cookies.get("userToken");
  const isPublicPath = path === "/login" || path === "/signUp";

  if (userToken && isPublicPath) {
    // Redirect based on isNewUser cookie
    return NextResponse.redirect(
      new URL(isNewUser ? "/success" : "/imageGeneration", request.nextUrl)
    );
  } else if (!userToken && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the user is trying to access "/success" without being identified as a new user, redirect to "/imageGeneration"
  if (path === "/success" && !isNewUser) {
    return NextResponse.redirect(new URL("/imageGeneration", request.nextUrl));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/imageGeneration",
    "/inspiration",
    "/paymentSuccessful",
    "/login",
    "/signUp",
    "/success", 
  ],
};
