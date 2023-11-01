import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import draftEventsPost from "@/app/models/posts/draftEventsPost";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { check } = body
        //Check if the request is correct
        if (!check && check != 'checking') {
            return NextResponse.json({
                msg: "Sorry, bad request",
                code: 0
            })
        }
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
        const draftPost = await draftEventsPost.findOne({ userId: userID })
        if (!draftPost) {
            //Draft not found create it
            const createDraft = await draftEventsPost.create({
                pin: getToken.pinCode(),
                userId: getToken.userID()
            })
            createDraft.save()
        }
        return NextResponse.json({
            msg: "Draft created or exists",
            code: 1,
            res: draftPost
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}