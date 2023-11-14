import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const pinCookie:any = process.env.PIN_CODE
        const pin_code = req.cookies.get(pinCookie)?.value || '';

        try {
            const data = await User.aggregate([
                {
                    $match: { pinCode: parseInt(pin_code,10) }
                }, {
                    $group: {
                        _id: "$professionSlug",
                        count: { $sum: 1 }
                    }

                }
            ])

            return NextResponse.json({
                data: data,
                code: 1,
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