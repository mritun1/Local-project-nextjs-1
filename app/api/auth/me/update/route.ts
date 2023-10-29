import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();

        const getData = new getTokenData(req)
        const userID = getData.userID()
        const res = await User.findByIdAndUpdate({ _id: userID }, body, { new: true })
        if (!res) {
            return NextResponse.json({
                msg: "Sorry, Update failed",
                code: 0
            })
        }

        return NextResponse.json({
            msg: "Update success",
            code: 1,
            response: body
        })

    }catch(err){
        return NextResponse.json({
            msg:err,
            code:0
        })
    }
}