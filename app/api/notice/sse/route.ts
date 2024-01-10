import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageLists from "@/app/models/message/message";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import { NextRequest } from "next/server";

export const runtime = 'nodejs';
// This is required to enable streaming
export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest
) {
    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const token = new getTokenData(req);
    const uId = token.userID()

    try {
        await connectDB();

        const mgsCount = await messageLists.find({
            $or: [{ firstUser: Object(uId) }, { secondUser: Object(uId) }],
            $and: [
                { count: { $gt: 0 } },
                { lastUserId: { $ne: Object(uId) }}
            ]
        }).count();

        //----------------------------------------------------------------------------------------
        // NOTIFICATION - START
        //----------------------------------------------------------------------------------------
        const noticeAll = await notificationsMain.find({ sendType: 'all', seen: false }).count();
        const noticeOne = await notificationsMain.find({ 
            $or: [
                { sendType: 'one' },
                { sendType: 'oneToOne' }
            ],
            uid: uId
         }).count();
        const totalNotice = noticeAll + noticeOne;
        //----------------------------------------------------------------------------------------
        // NOTIFICATION - END
        //----------------------------------------------------------------------------------------

        const ArrData: any[] = [];
        ArrData.push({ notification: totalNotice, mgsCount: mgsCount });

        const ArrDataString = JSON.stringify(ArrData)

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
