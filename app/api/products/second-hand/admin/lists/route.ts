import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import productSecondHand from "@/app/models/products/secondHand";

export async function POST(req: NextRequest) {
    try {

        await connectDB();

        const token = new getTokenData(req);
        const uId = token.userID();

        if (!token && !uId) {
            return NextResponse.json({
                msg: "You are not logged in.",
                code: 0
            })
        }

        //GET GET PIN
        const pinCookie: any = process.env.PIN_CODE
        const pin = req.cookies.get(pinCookie)?.value || '';

        const products = await productSecondHand.find({ userId: uId });
        
        return NextResponse.json({
            data: products,
            msg: "Lists of Data",
            total: products.length,
            pin: pin,
            code: 1
        });

    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}