import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageLists from "@/app/models/message/message";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        //GET CURRENT USERID
        const token = new getTokenData(req);
        const uId = token.userID();
        let msgId;
        //Firstly, Check if there is message with this user ID
        const cursor = await messageLists.find({
            $or: [{ firstUser: Object(uId) }, { secondUser: Object(uId) }]
        }).sort({ updatedDate: -1 });

        //ADDING THE ADDITIONAL USERS DATA
        const ArrayItems: any[] = [];
        // Assuming cursor is an array of items
        const promises = cursor.map(async (item) => {
            //Check User Id
            let secondId:string = ""
            if (uId != item.firstUser){
                secondId = item.firstUser
            }else{
                secondId = item.secondUser
            }
            let lastUser:string = "other"
            if (String(item.lastUserId) === String(uId)){
                lastUser = "me"
            }
            const user = await User.findById(Object(secondId), {
                firstName: 1,
                profilePic: 1
            }); // Specify the fields you want to include
            let otherUser:string = '';
            if (item.lastUserId){
                const ou = await User.findById(Object(item.lastUserId),{
                    firstName:1
                })
                otherUser = ou.firstName
            }
            ArrayItems.push({
                item, user: {
                    firstName: user.firstName,
                    profilePic: user.profilePic,
                    otherName: otherUser,
                    lastUser: lastUser
                }
            }); // Include only the desired fields
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        return NextResponse.json({
            data: ArrayItems,
            code: 1
        })
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}