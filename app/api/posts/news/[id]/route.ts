import connectDB from "@/app/db/config";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import NewsPost from "@/app/models/posts/newsPost";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        await connectDB();

        const slug = params.id;
        const objectId = new ObjectId(slug);
        const cursor = await NewsPost.find({ _id: objectId });
        
        return NextResponse.json({
            msg: "Data found",
            data: cursor,
            code: 1
        })

    } catch (err) {
        return NextResponse.json({
            msg: "Sorry! no data found.",
            code: 0
        })
    }
}