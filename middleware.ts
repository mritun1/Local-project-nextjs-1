import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req:NextRequest){
    const path = req.nextUrl.pathname
    const isPublicPath = path == '/'
    const tokeyKey: any = process.env.LOGIN_COOKIE
    const token = req.cookies.get(tokeyKey)?.value || "";

    const isUserActive: any = process.env.IS_USER_ACTIVE
    const isUserActiveCookie = req.cookies.get(isUserActive)?.value || "";

    if (isPublicPath && token && !isUserActiveCookie){
        return NextResponse.redirect(new URL('/app/local-news/', req.nextUrl));
    }
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    if (!isPublicPath && token && isUserActiveCookie) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }
    
    
}
export const config = {
    matcher:[
        '/',
        '/app/:path*'
    ]
}