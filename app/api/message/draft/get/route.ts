import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageLists from "@/app/models/message/message";
import messageChatDraft from "@/app/models/message/messageChatDraft";
import User from "@/app/models/userModels";
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
        //GET USER DATA
        const mgsLst = await messageLists.find({ _id: Object(mgsId) }).limit(1).select('firstUser secondUser')
        let otherUserData:any;
        if (mgsLst.length>0){
            const mgsData = mgsLst[0]
            let nextUID:string;
            if(mgsData.firstUser != uId){
                nextUID = mgsData.firstUser
            }else{
                nextUID = mgsData.secondUser
            }
            otherUserData = await User.findById({ _id: Object(nextUID) }).select('firstName lastName profilePic')
        }
        
        return NextResponse.json({
            data: check,
            user: otherUserData,
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