import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: {
        params: {
            id: string
        }
    }
) {
    try {

        let id: string = params.id;

        await connectDB();

        const cursor = await User.find({_id:id})

        if (cursor.length == 0) {
            return NextResponse.json({
                msg: "Data Not found",
                code: 0
            })
        }

        return NextResponse.json({
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

