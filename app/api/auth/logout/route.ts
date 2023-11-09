import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
    const cokiename:any = process.env.LOGIN_COOKIE
    const pinCookie: any = process.env.PIN_CODE
    cookies().delete(cokiename)
    cookies().delete(pinCookie)
    return NextResponse.json({code:1,status:"Logout success"})
}