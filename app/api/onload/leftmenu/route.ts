import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const pinCookie: any = process.env.PIN_CODE;
        const pin = req.cookies.get(pinCookie)?.value || "";

        return NextResponse.json({
            code:1,
            pin:pin,
        })
        
    }catch(err){
        return NextResponse.json({
            code:0
        },{status:405})
    }
}