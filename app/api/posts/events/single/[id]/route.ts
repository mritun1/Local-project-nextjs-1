import connectDB from "@/app/db/config";
import eventsPost from "@/app/models/posts/eventsPost";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        let id: string = params.id;
        await connectDB();

        const cursor = await eventsPost.find({_id:id})

        if (cursor.length == 0) {
            return NextResponse.json({
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
            if (user) {
                ArrayItems.push({
                    item, user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profilePic: user.profilePic
                    }
                }); // Include only the desired fields
            } else {
                ArrayItems.push({
                    item, user: {
                        firstName: "--",
                        lastName: "--",
                        profilePic: ""
                    }
                }); // Include only the desired fields
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        return NextResponse.json({
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

