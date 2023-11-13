import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import eventsPost from "@/app/models/posts/eventsPost";
import NewsPost from "@/app/models/posts/newsPost";
import seenModels from "@/app/models/seenModels";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        //GET THE REQUEST
        //GET THE PIN CODE
        const pinCookie:any = process.env.PIN_CODE
        const pinCode = req.cookies.get(pinCookie)?.value || '';
        //GET THE TOKEN DATA
        const token = new getTokenData(req);
        const userId = token.userID();
        if(!userId){
            return NextResponse.json({
                msg: "You're not logged in.",
                code: 0
            })
        }
        //READ THE SEEN UPDATE COLLECTION
        const seenUpdate = await seenModels.findOne(
            { userId: Object(userId)}
        )
        //COUNT THE REQUIRED NUMBERS
        let newsCount = 0;
        newsCount = await NewsPost.countDocuments(
            {
                userId: Object(userId),
                createdDate: { $gt: seenUpdate.seenNewsPost }
            }
        )
        let eventsCount = 0;
        eventsCount = await eventsPost.countDocuments(
            {
                userId: Object(userId),
                createdDate: { $gt: seenUpdate.seenNewsPost }
            }
        )
        let peopleCount = 0;
        peopleCount = await User.countDocuments(
            {
                pinCode: pinCode,
                createdDate: { $gt: seenUpdate.seenNewsPost }
            }
        )

        let offersCount = 0
        let marketCount = 0
        let secondhandCount = 0
        let businessCount = 0
        let groupsCount = 0

        return NextResponse.json({
            newsCount,
            eventsCount,
            peopleCount,
            offersCount: offersCount,
            marketCount: marketCount,
            secondhandCount: secondhandCount,
            businessCount: businessCount,
            groupsCount: groupsCount
        })

    }catch(err){
        return NextResponse.json({
            msg:err,
            code: 0
        })
    }
}