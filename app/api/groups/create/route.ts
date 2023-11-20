import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModels from "@/app/models/groups/groupsModels";
import groupsModelsDraft from "@/app/models/groups/groupsModelsDraft";
import groupsSaved from "@/app/models/groups/groupsSaved";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        //GET GET PIN
        const pinCookie: any = process.env.PIN_CODE
        const pin = req.cookies.get(pinCookie)?.value || '';
        //GET IMAGE ARRAY
        const draft = await groupsModelsDraft.findOne({ groupCreatorId: userID })
        //Check and create the draft post
        const createDraft = await groupsModels.create({
            groupName: draft.groupName,
            groupPic: draft.groupPic,
            groupPin: pin,
            groupCreatorId: draft.groupCreatorId,
            groupMembers: draft.groupMembers,
            createdDate: Date.now()
        })
        if (createDraft) {
            //DELETE FROM DRAFT
            await groupsModelsDraft.deleteOne({ groupCreatorId: userID })
        }
        //Update to my saved
        await groupsSaved.create({
            userId: userID,
            savedId: createDraft._id
        })
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


