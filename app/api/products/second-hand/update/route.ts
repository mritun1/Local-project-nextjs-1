import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import productSecondHandDraft from "@/app/models/products/secondHandDraft";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        //Check if the request is correct
        if (!body) {
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
        const draftPost = await productSecondHandDraft.findOneAndUpdate({ userId: userID }, body, { new: true })
        if (!draftPost) {
            return NextResponse.json({
                msg: "Sorry, Update Failed",
                code: 0
            })
        }

        return NextResponse.json({
            msg: "Draft updated Success",
            code: 1
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}