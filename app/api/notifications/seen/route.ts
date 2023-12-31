import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        //GET THE ID
        const body = await req.json();
        const {id} = body;
        //GET ALL THE DATA
        await notificationsMain.findOneAndUpdate(
            {_id:id},
            { seen:true}
        )
        return NextResponse.json({
            code: 1
        })
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}