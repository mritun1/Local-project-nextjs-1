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
        //GET IMAGE ARRAY
        const getImgs = await draftNewsPost.findOne({userId:userID})
        //Check and create the draft post
        const createDraft = await NewsPost.create({
            des,
            title,
            pin: getToken.pinCode(),
            userId: getToken.userID(),
            images: getImgs.images,
            createdDate: Date.now()
        });

        try {
            if (createDraft) {
                // The document was saved successfully
                // You can continue with your logic here
                await draftNewsPost.deleteOne({ userId: userID })
            }
        } catch (error) {
            // Handle any errors that occurred during saving
            return NextResponse.json({
                msg: error,
                code: 0
            })
            // You may want to send an error response if there's an issue
            // res.status(500).json({ error: "Internal server error" });
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