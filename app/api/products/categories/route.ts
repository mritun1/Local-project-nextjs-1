import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import productCategories from "@/app/models/products/productsModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectDB();

        const res = await productCategories.find({})
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
            data: res,
            mobile: token.mobile(),
            pin: pin
        })
    }catch(err){
        return NextResponse.json({
            msg:err,
            code: 0
        })
    }
}