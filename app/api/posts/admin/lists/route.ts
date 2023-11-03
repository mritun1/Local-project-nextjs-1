import { NextRequest, NextResponse } from "next/server";
import getTokenData from "@/app/lib/getTokenData";
import connectDB from "@/app/db/config";
import NewsPost from "@/app/models/posts/newsPost";
import eventsPost from "@/app/models/posts/eventsPost";

export async function GET(req: NextRequest) {
    try {
        await connectDB()

        const getToken = new getTokenData(req)
        const userID = getToken.userID()

        if (!userID) {
            return NextResponse.json({
                msg: "User not allowed"
            }, { status: 405 })
        }

        
        

        return NextResponse.json({
            data: "Api not done"
        })

    } catch (err) {
        return NextResponse.json({
            msg: err
        })
    }
}

function dt(dateStr:Date){
    const dateObject = new Date(dateStr);
    const milliseconds = dateObject.getTime();

    return milliseconds

}