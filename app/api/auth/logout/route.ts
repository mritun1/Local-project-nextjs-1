import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(){
    const cokiename:any = process.env.LOGIN_COOKIE
    cookies().delete(cokiename)
    return NextResponse.json({code:1,status:"Logout success"})
}