import connectDB from "@/app/db/config";
import eventsPost from "@/app/models/posts/eventsPost";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest
) {
    try {
        await connectDB();

        const pinCookie: any = process.env.PIN_CODE;
        const pin = req.cookies.get(pinCookie)?.value || "";
        const cursor = await eventsPost.find({ pin: pin });

        if (cursor.length === 0){
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
            code: 1
        })

    } catch (err) {
        return NextResponse.json({
            msg: "Sorry! no data found.",
            code: 0
        })
    }
}

