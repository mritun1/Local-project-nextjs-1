import connectDB from "@/app/db/config";
import productSecondHand from "@/app/models/products/secondHand";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { slug:string, page: number, pin: string } }
) {
    try {

        let page: number = params.page;
        let pin: string = params.pin;
        let slug: string = params.slug;

        const limit: number = 10;
        let offset: number = (page - 1) * limit;

        await connectDB();

        if (pin === '0') {
            const pinCookie: any = process.env.PIN_CODE;
            pin = req.cookies.get(pinCookie)?.value || "";
        }

        let cursor;
        if(pin === '0000000'){
            //FOR GLOBAL
            if (slug === 'all') {
                cursor = await productSecondHand.find({}).sort({ createdDate: -1 }).skip(offset).limit(limit);
            } else {
                cursor = await productSecondHand.find({ productCategory: slug }).sort({ createdDate: -1 }).skip(offset).limit(limit);
            }
        }else{
            //FOR LOCAL
            if (slug === 'all') {
                cursor = await productSecondHand.find({ productPin: pin }).sort({ createdDate: -1 }).skip(offset).limit(limit);
            } else {
                cursor = await productSecondHand.find({ productPin: pin, productCategory: slug }).sort({ createdDate: -1 }).skip(offset).limit(limit);
            }
        }

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
                lastName: 1,
                profilePic: 1

            }); // Specify the fields you want to include
            ArrayItems.push({
                item, user: {
                    firstName: user.firstName,
                    profilePic: user.profilePic
                }
            }); // Include only the desired fields
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

