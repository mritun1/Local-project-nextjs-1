import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsChatDraft from "@/app/models/groups/groupsChatDraft";
import groupsModels from "@/app/models/groups/groupsModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { gId } = body
        //Check if the request is correct
        if (!gId) {
            return NextResponse.json({
                msg: "Sorry, bad request",
                code: 0
            })
        }
        //Check if the token exists
        const getToken = new getTokenData(req)
        
        //Check and create the draft post
        const draftPost = await groupsChatDraft.findOne({ groupId: gId, senderId: getToken.userID() })
        if (!draftPost) {
            //Draft not found create it
            await groupsChatDraft.create({
                groupId: gId,
                senderId: getToken.userID(),
            })
        }
        //GET THE GROUP INFO
        const group = await groupsModels.findOne({_id:gId})
        return NextResponse.json({
            msg: "Draft created or exists",
            code: 1,
            content: draftPost.chatContent,
            groupName: group.groupName,
            groupPic: group.groupPic
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}