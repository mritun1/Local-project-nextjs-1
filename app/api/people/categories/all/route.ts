import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import User from "@/app/models/userModels";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const pinCookie:any = process.env.PIN_CODE
        const pin_code = req.cookies.get(pinCookie)?.value || '';

        const token = new getTokenData(req)
        const uId = token.userID()
        const uID = new mongoose.Types.ObjectId(uId);

        try {
            const data = await User.aggregate([
                {
                    $match: {  
                        $and: [
                            { pinCode: parseInt(pin_code, 10) },
                            { isActive: 1 },
                            { _id: { $ne: uID } }
                        ]
                    }
                }, {
                    $group: {
                        _id: "$professionSlug",
                        count: { $sum: 1 }
                    }

                }
            ])

            const all = await User.find({  
                $and: [
                    { pinCode: parseInt(pin_code, 10) },
                    { isActive: 1 },
                    { _id: { $ne: uId } }
                ]
            })

            return NextResponse.json({
                data: data,
                code: 1,
                allTotal: all.length,
                pin:pin_code
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