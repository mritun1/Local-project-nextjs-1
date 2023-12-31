import connectDB from "@/app/db/config";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        //GET THE ID
        const body = await req.json();
        const { notification } = body;
        //GET ALL THE DATA
        await notificationsMain.create({
            sendType:'all',
            notificationType:'message',
            message: notification,
            createdDate:Date.now()
        })
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