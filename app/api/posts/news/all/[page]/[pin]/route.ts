import connectDB from "@/app/db/config";
import NewsPost from "@/app/models/posts/newsPost";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { page: number,pin:string } }
) {
    try {

        let page: number = params.page;
        let pin: string = params.pin;

        const limit: number = 3;
        let offset: number = (page - 1) * limit;

        await connectDB();

        if(pin === '0'){
            const pinCookie: any = process.env.PIN_CODE;
            pin = req.cookies.get(pinCookie)?.value || "";
        }

        //IF THE PIN IS - 0000000 - IT IS A GLOBAL
        let cursor
        if (pin==='0000000'){
            cursor = await NewsPost.find({}).sort({ createdDate: -1 }).skip(offset).limit(limit);
        }else{
            cursor = await NewsPost.find({ pin: { $in: [pin, '0000000'] } }).sort({ createdDate: -1 }).skip(offset).limit(limit);
        }
        

        if (cursor.length == 0) {
            return NextResponse.json({
                pin: pin,
                msg: "Data Not found",
                code: 0
            })
        }

        try{
            //ADDING THE ADDITIONAL USERS DATA
            const ArrayItems: any[] = [];
            // Assuming cursor is an array of items
            const promises = cursor.map(async (item) => {
                const user = await User.findById(item.userId, {
                    firstName: 1,
                    lastName: 1,
                    profilePic:1
                }); // Specify the fields you want to include
                if (user){
                    ArrayItems.push({
                        item, user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            profilePic: user.profilePic
                        }
                    }); // Include only the desired fields
                }else{
                    ArrayItems.push({
                        item, user: {
                            firstName: "--",
                            lastName: "--",
                            profilePic: "/icons/others/profile.webp"
                        }
                    }); // Include only the desired fields
                }
                
            });

            // Wait for all promises to resolve
            await Promise.all(promises);

            // Sort ArrayItems by createdDate in descending order
            ArrayItems.sort((a, b) => b.item.createdDate - a.item.createdDate);

            return NextResponse.json({
                pin: pin,
                msg: "Data found",
                data: ArrayItems,
                code: 1,
                offset,limit
            })
        }catch(error){
            return NextResponse.json({
                msg: error,
                code: 0
            })
        }

    } catch (err) {
        return NextResponse.json({
            msg: "Sorry! no data found.",
            code: 0
        })
    }
}

