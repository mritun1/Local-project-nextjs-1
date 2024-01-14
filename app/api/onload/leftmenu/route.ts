import getTokenData from "@/app/lib/getTokenData";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        const body = await req.json();
        const { fcmToken } = body

        const token = new getTokenData(req);
        const uId = token.userID();

        const pinCookie: any = process.env.PIN_CODE;
        const pin = req.cookies.get(pinCookie)?.value || "";

        //UPDATE FcmToken
        await User.findByIdAndUpdate(uId, { fcmToken: fcmToken })

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