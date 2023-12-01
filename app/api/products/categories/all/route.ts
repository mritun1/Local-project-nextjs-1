import connectDB from "@/app/db/config";
import productSecondHand from "@/app/models/products/secondHand";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const pinCookie: any = process.env.PIN_CODE
        const pin_code = req.cookies.get(pinCookie)?.value || '';

        try {
            let data;
            let all;
            if (pin_code === '0000000') {
                //FOR GLOBAL
                data = await productSecondHand.aggregate([
                    {
                        $group: {
                            // _id: "$productCategory",
                            _id: {
                                productCategory: "$productCategory",
                                productCatName: "$productCatName"
                            },
                            count: { $sum: 1 }
                        }

                    }
                ])
                all = await productSecondHand.find({})
            }else{
                data = await productSecondHand.aggregate([
                    {
                        $match: { productPin: parseInt(pin_code, 10) }
                    }, {
                        $group: {
                            // _id: "$productCategory",
                            _id: {
                                productCategory: "$productCategory",
                                productCatName: "$productCatName"
                            },
                            count: { $sum: 1 }
                        }

                    }
                ])
                all = await productSecondHand.find({ productPin: parseInt(pin_code, 10) })
            }

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