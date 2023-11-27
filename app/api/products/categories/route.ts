import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import productCats from '../../../json/productCats.json'

export async function GET(req:NextRequest){
    try{
        await connectDB();

        const token = new getTokenData(req);

        const pinCookie: any = process.env.PIN_CODE;
        const pin = req.cookies.get(pinCookie)?.value || "";

        if (!token){
            return NextResponse.json({
                msg: "error not logged in",
                code: 0
            })
        }
        return NextResponse.json({
            code:1,
            mobile: token.mobile(),
            pin: pin,
            json: productCats
        })
    }catch(err){
        return NextResponse.json({
            msg:err,
            code: 0
        })
    }
}