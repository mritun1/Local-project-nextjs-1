import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: {
        params: {
            page: number,
            pin: string,
            slug: string
        }
    }
) {
    try {

        let page: number = params.page;
        let pin: string = params.pin;
        let cat: string = params.slug;

        const limit: number = 10;
        let offset: number = (page - 1) * limit;

        await connectDB();

        if (pin === '0'){
            const pinCookie: any = process.env.PIN_CODE;
            pin = req.cookies.get(pinCookie)?.value || "";
        }

        let cursor = null;
        if(cat === 'all'){
            cursor = await User.find({ pinCode: pin, isActive: 1 })
                .select('-password -otp -isActive -__v') // Exclude password and otp
                .sort({ createdDate: -1 })
                .skip(offset)
                .limit(limit);
        }else{
            cursor = await User.find({ pinCode: pin, professionSlug: cat, isActive: 1 })
                .select('-password -otp -isActive -__v') // Exclude password and otp
                .sort({ createdDate: -1 })
                .skip(offset)
                .limit(limit);
        }

        if (cursor.length == 0) {
            return NextResponse.json({
                pin: pin,
                msg: "Data Not found",
                code: 0
            })
        }

        return NextResponse.json({
            pin: pin,
            msg: "Data found",
            data: cursor,
            code: 1,
        })

    } catch (err) {
        return NextResponse.json({
            msg: "Sorry! no data found.",
            code: 0
        })
    }
}

