import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req:NextRequest){
    const path = req.nextUrl.pathname
    const isPublicPath = path == '/'
    const tokeyKey: any = process.env.LOGIN_COOKIE
    const token = req.cookies.get(tokeyKey)?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/app/local-offers',req.nextUrl));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/',req.nextUrl));
    }
}
export const config = {
    matcher:[
        '/',
        '/app/:path*'
    ]
}