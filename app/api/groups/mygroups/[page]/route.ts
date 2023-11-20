import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModels from "@/app/models/groups/groupsModels";
import groupsSaved from "@/app/models/groups/groupsSaved";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { page: number } }
) {
    try {

        let page: number = params.page;

        const limit: number = 2;
        let offset: number = (page - 1) * limit;

        await connectDB();

        const pinCookie: any = process.env.PIN_CODE;
        const pin = req.cookies.get(pinCookie)?.value || "";

        const token = new getTokenData(req);
        const uId = token.userID()

        const cursor = await groupsSaved.find({ groupPin: pin, userId: uId }).skip(offset).limit(limit);

        if (cursor.length == 0) {
            return NextResponse.json({
                pin: pin,
                msg: "Data Not found",
                code: 0
            })
        }

        //ADDING THE ADDITIONAL USERS DATA
        const ArrayItems: any[] = [];
        // Assuming cursor is an array of items
        const promises = cursor.map(async (item) => {
            const GroupData = await groupsModels.findById(item.savedId); // Specify the fields you want to include
            if (GroupData) {
                ArrayItems.push({
                    item: {
                        GroupData
                    }
                }); // Include only the desired fields
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        return NextResponse.json({
            pin: pin,
            msg: "Data found",
            data: ArrayItems,
            code: 1,
        })

    } catch (err) {
        return NextResponse.json({
            msg: "Sorry! no data found.",
            code: 0
        })
    }
}

