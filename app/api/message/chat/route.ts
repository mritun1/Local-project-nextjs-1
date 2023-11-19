import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageChat from "@/app/models/message/messageChat";
import messageChatDraft from "@/app/models/message/messageChatDraft";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        //Get Data from body
        const {content} = await req.json();
        if (!content){
            return NextResponse.json({
                msg: "Sorry! No content found.",
                code: 0
            })
        }
        //Get Data From Token
        const token = new getTokenData(req);
        const uId = token.userID();
        if(!token || !uId){
            return NextResponse.json({
                msg: "Sorry! Bad request",
                code: 0
            })
        }
        //Connect to Database
        await connectDB();
        // Assuming uId is a valid MongoDB ObjectId or some other identifier
        const draft = await messageChatDraft.findOne({ userId: uId });
        //INSERT INTO THE CHAT DB
        if (draft) {
            // Insert into Database
            await messageChat.create({
                messageId: draft.messageId,
                userId: draft.userId,
                content: content,
                images: draft.images,
                videos: draft.videos,
                files: draft.files,
                createdDate: Date.now()
            });
            //After success delete, delete the draft
            await messageChatDraft.findOneAndDelete({userId:uId})
        } else {
            return NextResponse.json({
                msg: 'Sorry! no data found.',
                code: 0
            })
        }
        return NextResponse.json({
            msg: 'Message Added success',
            code: 1
        })

    }catch(error){
        return NextResponse.json({
            msg:error,
            code:0
        })
    }
}