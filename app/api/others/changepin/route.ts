import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        //GET THE REQUEST
        const body = await req.json();
        const {pin,type} = body
        //GET THE TOKEN DATA
        const pinCookie: any = process.env.PIN_CODE
        if(type==='change'){
            //CHANGE THE COOKIE
            cookies().set(pinCookie, pin)
        }else{
            cookies().set(pinCookie, '0000000')
        }
        
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