import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import draftEventsPost from "@/app/models/posts/draftEventsPost";
import eventsPost from "@/app/models/posts/eventsPost";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { des, title, startDate, endDate } = body
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
        const getImgs = await draftEventsPost.findOne({ userId: userID })
        //Check and create the draft post
        const createDraft = await eventsPost.create({
            des, title, startDate, endDate,
            pin: getToken.pinCode(),
            userId: getToken.userID(),
            images: getImgs.images,
            createdDate: Date.now()
        })
        if (createDraft) {
            //DELETE FROM DRAFT
            await draftEventsPost.deleteOne({ userId: userID })
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

export async function PUT(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { id, des, title, startDate, endDate } = body
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        //Update the events
        const objId = new ObjectId(id);
        await eventsPost.findOneAndUpdate({ _id: objId },{
            des, title, startDate, endDate,
            updatedDate: Date.now()
        });
        return NextResponse.json({
            msg: "Event Updated success",
            code: 1,
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}

