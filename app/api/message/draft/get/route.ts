import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageChatDraft from "@/app/models/message/messageChatDraft";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { mgsId } = await req.json()
        //Get Current UserId
        const token = new getTokenData(req)
        const uId = token.userID()
        //Check If Draft Already exists
        const check = await messageChatDraft.find({ messageId: Object(mgsId), userId: Object(uId) }).limit(1)
        
        return NextResponse.json({
            data: check,
            msg: "updated",
            code: 1
        })
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}