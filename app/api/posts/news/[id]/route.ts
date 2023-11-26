import connectDB from "@/app/db/config";
import { NextResponse } from "next/server";
import NewsPost from "@/app/models/posts/newsPost";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
    ) {
    try {
        await connectDB();

        const slug = params.id;
        const cursor = await NewsPost.findById(slug);
        
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