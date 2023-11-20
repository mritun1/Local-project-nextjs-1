import connectDB from "@/app/db/config";
import groupsModels from "@/app/models/groups/groupsModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { page: number, pin: string } }
) {
    try {

        let page: number = params.page;
        let pin: string = params.pin;

        const limit: number = 2;
        let offset: number = (page - 1) * limit;

        await connectDB();

        if (pin === '0') {
            const pinCookie: any = process.env.PIN_CODE;
            pin = req.cookies.get(pinCookie)?.value || "";
        }

        const cursor = await groupsModels.find({ groupPin: pin }).sort({ createdDate: -1 }).skip(offset).limit(limit);

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

