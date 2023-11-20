import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import groupsChat from "@/app/models/groups/groupsChat";
import groupsChatDraft from "@/app/models/groups/groupsChatDraft";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { gId } = body
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        const draft = await groupsChatDraft.findOne({ groupId: gId, senderId: userID });

        if (draft) {
            try {
                // Check and create the chat post
                const createPost = await groupsChat.create({
                    groupId: draft.groupId,
                    senderId: draft.senderId,
                    chatContent: draft.chatContent,
                    createdDate: Date.now()
                    // Add other properties like images, videos, files if needed
                });

                if (createPost) {
                    // If post is created successfully, delete from draft
                    await groupsChatDraft.deleteOne({ groupId: gId, senderId: userID });
                } else {
                    console.error('Failed to create chat post.');
                    // Handle the failure to create the chat post
                }
            } catch (error) {
                console.error('An error occurred:', error);
                // Handle any unexpected errors during the process
            }
        } else {
            console.error('Draft not found.');
            // Handle the case where the draft is not found
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
        const { gId, content } = body
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        //Update the Group Chat Draft
        await groupsChatDraft.findOneAndUpdate({ groupId: gId, senderId:userID }, {
            chatContent: content,
            createdDate: Date.now()
        });
        return NextResponse.json({
            msg: "Updated success",
            code: 1,
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}

