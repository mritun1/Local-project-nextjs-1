import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModels from "@/app/models/groups/groupsModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { page: number, pin: string } }
) {
    try {

        let page: number = params.page;
        let pin: string = params.pin;

        const limit: number = 2;
        let offset: number = (page - 1) * limit;

        await connectDB();

        if (pin === '0') {
            const pinCookie: any = process.env.PIN_CODE;
            pin = req.cookies.get(pinCookie)?.value || "";
        }

        //0000000 means GLOBAL VISIBLE
        const cursor = await groupsModels.find({ groupPin: { $in: [pin, '0000000'] } }).sort({ createdDate: -1 }).skip(offset).limit(limit);

        const token = new getTokenData(req);
        const uId = token.userID()

        //ADDING THE ADDITIONAL USERS DATA
        const ArrayItems: any[] = [];
        // Assuming cursor is an array of items
        const promises = cursor.map(async (item) => {
            if (item.groupMembers.includes(uId)) {
                ArrayItems.push({
                    item, btn: 'joined'
                }); // Include only the desired fields
            } else {
                ArrayItems.push({
                    item, btn: 'notJoined'
                }); // Include only the desired fields
            }
            
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        if (cursor.length == 0) {
            return NextResponse.json({
                pin: pin,
                msg: "Data Not found",
                code: 0
            })
        }

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

