import connectDB from "@/app/db/config";
import eventsPost from "@/app/models/posts/eventsPost";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    {params}:{params:{page:number}}
) {
    try {

        let page:number = params.page;

        const limit:number = 2;
        let offset:number = (page-1) * limit;

        await connectDB();

        const pinCookie: any = process.env.PIN_CODE;
        const pin = req.cookies.get(pinCookie)?.value || "";
        const cursor = await eventsPost.find({ pin: pin }).sort({ createdDate: -1 }).skip(offset).limit(limit);

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
            const user = await User.findById(item.userId, {
                firstName: 1,
                lastName: 1
            }); // Specify the fields you want to include
            ArrayItems.push({ item, user: {
                firstName: user.firstName,
                lastName: user.lastName
            } }); // Include only the desired fields
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

