import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModels from "@/app/models/groups/groupsModels";
import groupsSaved from "@/app/models/groups/groupsSaved";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const { gId } = await req.json();
        if(!gId){
            return NextResponse.json({
                msg: "Sorry bad request",
                code: 0
            })
        }
        const token = new getTokenData(req);
        const uId = token.userID();
        if (!uId) {
            return NextResponse.json({
                msg: "Sorry not Logged In",
                code: 0
            })
        }
        //Update to groups
        await groupsModels.findOneAndUpdate({_id:gId},{
            $push:{
                groupMembers:uId
            }
        })
        //Update to my saved
        await groupsSaved.create({
            userId:uId,
            savedId:gId
        })
        return NextResponse.json({
            msg: "Success",
            code: 1
        })
    }catch(error){
        return NextResponse.json({
            msg:error,
            code:0
        })
    }
}