import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsChatDraft from "@/app/models/groups/groupsChatDraft";
import groupsModels from "@/app/models/groups/groupsModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { groupId } = await req.json()
        //Get Current UserId
        const token = new getTokenData(req)
        const uId = token.userID()
        //Get the details of Groups
        const group = await groupsModels.findOne({_id:groupId},{
            groupName:1,
            groupPic:1
        })
        //Get the Group chat data
        const groupChat = await groupsChatDraft.findOne({ groupId: groupId, senderId : uId})
        if(groupChat){
            return NextResponse.json({
                data: groupChat,
                group: group,
                msg: "Got Data",
                code: 1
            })
        }else{
            return NextResponse.json({
                group: group,
                msg: "Got Data",
                code: 1
            })
        }

        
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}