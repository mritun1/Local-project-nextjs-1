import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        //GET THE REQUEST
        const body = await req.json();
        const {pin} = body
        //GET THE TOKEN DATA
        const pinCookie:any = process.env.PIN_CODE
        //CHANGE THE COOKIE
        cookies().set(pinCookie,pin)
        //RESPONSE THE DATA
        return NextResponse.json({
            msg: "PIN Changed " + pin,
            code: 1
        })
    }catch(err){
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}