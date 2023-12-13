import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModels from "@/app/models/groups/groupsModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        let id: string = params.id;
        await connectDB();
        const cursor = await groupsModels.findById(Object(id))

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

