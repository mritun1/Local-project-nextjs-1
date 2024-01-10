import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const token = new getTokenData(req);
        const uID = token.userID();
        //GET ALL THE DATA
        const cursor = await notificationsMain.find({ 
            sendType: 'all' 
        }).sort({ createdDate: -1 });

        const cursorOthers = await notificationsMain.find({
            sendType: 'oneToOne',
            userId: uID
        }).sort({ createdDate: -1 });

        const arr = Array();
        arr.push(cursor)
        arr.push(cursorOthers)

        return NextResponse.json({
            data: arr,
            code: 1
        })
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}