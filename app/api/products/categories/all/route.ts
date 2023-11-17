import connectDB from "@/app/db/config";
import productSecondHand from "@/app/models/products/secondHand";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const pinCookie: any = process.env.PIN_CODE
        const pin_code = req.cookies.get(pinCookie)?.value || '';

        try {
            const data = await productSecondHand.aggregate([
                {
                    $match: { productPin: parseInt(pin_code, 10) }
                }, {
                    $group: {
                        _id: "$productCategory",
                        count: { $sum: 1 }
                    }

                }
            ])

            const all = await productSecondHand.find({ productPin: parseInt(pin_code, 10) })

            return NextResponse.json({
                data: data,
                code: 1,
                allTotal: all.length,
                pin: pin_code
            })
        } catch (err) {
            return NextResponse.json({
                msg: err,
                code: 0
            })
        }

    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}