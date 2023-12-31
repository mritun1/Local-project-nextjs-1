import connectDB from "@/app/db/config";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        //GET ALL THE DATA
        const cursor = await notificationsMain.find({ sendType: 'all' }).sort({ createdDate: -1 });
        return NextResponse.json({
            data: cursor,
            code: 1
        })
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}