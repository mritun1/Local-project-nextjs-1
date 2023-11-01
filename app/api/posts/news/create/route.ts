import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import draftNewsPost from "@/app/models/posts/draftNewsPost";
import NewsPost from "@/app/models/posts/newsPost";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const {des,title} = body
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        //Check and create the draft post
        const createDraft = await NewsPost.create({
            des,title,
            pin: getToken.pinCode(),
            userId: getToken.userID()
        })
        createDraft.save()
        if (createDraft){
            //DELETE FROM DRAFT
            await draftNewsPost.deleteOne({userId:userID})
        }
        return NextResponse.json({
            msg: "News created success",
            code: 1,
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}