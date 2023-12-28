import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import contributions from "@/app/models/contribution/contributions";
import User from "@/app/models/userModels";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { itemId, itemType } = body;
        if (!body) {
            return NextResponse.json({
                msg: "Bad Request",
                code: 0
            })
        }
        const token = new getTokenData(req);
        const uId = token.userID();
        let loggedIn = false;
        if (token) {
            loggedIn = true;
        }
        //GET ALL LISTS
        const data = await contributions.find({itemId:itemId,itemType:itemType})

        //ADDING THE ADDITIONAL USERS DATA
        const ArrayItems: any[] = [];
        // Assuming cursor is an array of items
        const promises = data.map(async (item) => {
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
        const lastData = await walletTransactions.findOne({ userId: uId }).sort({ slId: -1 });

        return NextResponse.json({
            msg: "Success",
            data: ArrayItems,
            bal: lastData.currentBal,
            code: 1,
            loggedIn: loggedIn
        })

        // if(data.length>0){
            
        // }else{
        //     return NextResponse.json({
        //         msg: "No Content",
        //         code: 0,
        //         loggedIn: loggedIn
        //     })
        // }

    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}