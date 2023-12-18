import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsChat from "@/app/models/groups/groupsChat";
import messageChat from "@/app/models/message/messageChat";
import User from "@/app/models/userModels";
import { NextRequest } from "next/server";

export const runtime = 'nodejs';
// This is required to enable streaming
export const dynamic = 'force-dynamic';

export async function GET(
    req: NextRequest,
    { params }: {
        params: {
            id: string
        }
    }
) {
    const msgid = params.id;

    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const token = new getTokenData(req);
    const uId = token.userID()

    try {
        await connectDB();
        const cursor = await groupsChat.find({ groupId: msgid }).limit(50);
        const ArrData: any[] = [];

        for (const ele of cursor) {
            const ar: any = { ele };

            if (ele.senderId != uId) {
                ar.uType = 'other';
                // Add the Name of the Sender
                try {
                    const user = await User.findById(ele.senderId, {
                        firstName: 1,
                        lastName: 1,
                        _id: 1
                    }); // Specify the fields you want to include

                    if (user) {
                        ar.sender = user.firstName;
                        ar.senderId = user._id;
                    }
                } catch (error) {
                    console.error('An error occurred while fetching user data:', error);
                    // Handle the error, e.g., set a default name
                    ar.sender = 'Unknown';
                }
            } else {
                ar.uType = 'me';
            }

            ArrData.push(ar);
        }

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
