import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        //GET THE TOKEN
        const token = new getTokenData(req);
        const uId = token.userID();
        if(!token){
            return NextResponse.json({
                msg: 'Sorry! not logged In',
                code: 0
            })
        }
        //GET ALL THE DATA
        const cursor = await notificationsMain.find({ 
            $or: [
                { userId: uId },
                { sendType: 'all' } 
            ]
         }).sort({ createdDate : -1});
        return NextResponse.json({
            data: cursor,
            code: 1
        })
    }catch(error){
        return NextResponse.json({
            msg:error,
            code:0
        })
    }
}