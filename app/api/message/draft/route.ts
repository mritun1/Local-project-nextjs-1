import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageChatDraft from "@/app/models/message/messageChatDraft";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const { mgsId, content } = await req.json()
        //Get Current UserId
        const token = new getTokenData(req)
        const uId = token.userID()
        //Check If Draft Already exists
        const check = await messageChatDraft.find({ messageId: Object(mgsId), userId : Object(uId)}).limit(1)
        if(check.length>0){
            //Chat Already exists
            //Now Update to Database
            await messageChatDraft.findOneAndUpdate(
                { messageId: Object(mgsId), userId: Object(uId) },
                {
                    content:content
                }
            )
        }else{
            //Create Chat
            await messageChatDraft.create({
                messageId: Object(mgsId), 
                userId: Object(uId),
                content: content
            })
        }
        return NextResponse.json({
            check: check,
            msg: "updated",
            code: 1
        })
    }catch(error){
        return NextResponse.json({
            msg:error,
            code:0
        })
    }
}