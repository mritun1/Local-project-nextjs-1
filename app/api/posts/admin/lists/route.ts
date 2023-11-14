import { NextRequest, NextResponse } from "next/server";
import LinkedList from "@/app/lib/dsa/linkedList/linkedList";
import NewsPost from "@/app/models/posts/newsPost";
import eventsPost from "@/app/models/posts/eventsPost";
import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";

export async function GET(req:NextRequest) {
    try {
        const linkedList = new LinkedList();

        await connectDB();

        const token = new getTokenData(req);
        const uId = token.userID();

        if(!token && !uId){
            return NextResponse.json({
                msg: "You are not logged in.",
                code: 0
            })
        }

        const eventsPostData = await eventsPost.find({userId:uId});
        eventsPostData.forEach(ele => {
            const newDoc = {
                ...ele,
                postType: 'Event',
            };
            linkedList.insertToArray(newDoc)
        });

        const NewsPostData = await NewsPost.find({ userId: uId });
        NewsPostData.forEach(ele => {
            const newDoc = {
                ...ele,
                postType: 'News',
            };
            linkedList.insertToArray(newDoc)
        });

        const result = linkedList.printArray();

        result.sort((a, b) => b._doc.createdDate - a._doc.createdDate)

        //GET GET PIN
        const pinCookie:any = process.env.PIN_CODE
        const pin = req.cookies.get(pinCookie)?.value || '';

        return NextResponse.json({
            data: result,
            msg: "Lists of Data",
            total: result.length,
            approved: result.length,
            pin: pin,
            code: 1
        });

    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}