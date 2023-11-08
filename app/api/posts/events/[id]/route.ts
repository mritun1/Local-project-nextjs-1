import connectDB from "@/app/db/config";
import eventsPost from "@/app/models/posts/eventsPost";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        await connectDB();

        const slug = params.id;
        const objectId = new ObjectId(slug);
        const cursor = await eventsPost.find({ _id: objectId });
        
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

