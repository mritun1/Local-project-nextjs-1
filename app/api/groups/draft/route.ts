import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModelsDraft from "@/app/models/groups/groupsModelsDraft";
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
        const draftPost = await groupsModelsDraft.findOne({ groupCreatorId: userID })
        if (!draftPost) {
            //Draft not found create it
            const createDraft = await groupsModelsDraft.create({
                groupCreatorId: userID,
                groupMembers:[
                    userID
                ]
            })
            createDraft.save()
            return NextResponse.json({
                msg: "Draft created",
                code: 1,
                data: createDraft
            })
        }
        return NextResponse.json({
            msg: "Draft exists",
            code: 1,
            data: draftPost
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}
//FOR ON KEY CHANGE  UPDATE
export async function PATCH(req: NextRequest) {
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
        const draftPost = await groupsModelsDraft.findOneAndUpdate({ groupCreatorId: userID }, body, { new: true })
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