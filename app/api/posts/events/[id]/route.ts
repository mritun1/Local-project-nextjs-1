import connectDB from "@/app/db/config";
import eventsPost from "@/app/models/posts/eventsPost";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        await connectDB();

        const slug = params.id;
        const cursor = await eventsPost.findById(slug);
        
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

