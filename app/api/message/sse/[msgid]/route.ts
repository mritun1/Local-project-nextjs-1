import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageChat from "@/app/models/message/messageChat";
import { NextRequest } from "next/server";

export const runtime = 'nodejs';
// This is required to enable streaming
export const dynamic = 'force-dynamic';

export async function GET(
    req:NextRequest,
    {params}:{
        params:{
            msgid:string
        }
    }
) {
    const msgid = params.msgid;

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const token = new getTokenData(req);
    const uId = token.userID()

    try {
        await connectDB();
        const cursor = await messageChat.find({ messageId: msgid }).limit(50)
        const ArrData: any[] = [];
        cursor.forEach((ele) => {
            const ar: any = { ele };
            if (ele.userId === uId) {
                ar.uType = 'me';
            }else{
                ar.uType = 'other';
            }
            ArrData.push(ar);
        });
        
        const data = JSON.stringify(cursor);
        const ArrDataString = JSON.stringify(ArrData)

        // writer.write(encoder.encode(`data: ${data}\n\n`));
        writer.write(encoder.encode(`data: ${ArrDataString}\n\n`));

    } catch (error) {
        console.error('An error occurred during MongoDB request', error);
        const errorMessage = { error: 'An error occurred during MongoDB request' };
        writer.write(encoder.encode(`data: ${JSON.stringify(errorMessage)}\n\n`));
    } finally {
        writer.close();
    }

    return new Response(responseStream.readable, {
        headers: {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache, no-transform',
        },
    });
}
