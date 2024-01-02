import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsModels from "@/app/models/groups/groupsModels";
import eventsPost from "@/app/models/posts/eventsPost";
import NewsPost from "@/app/models/posts/newsPost";
import productSecondHand from "@/app/models/products/secondHand";
import User from "@/app/models/userModels";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        //GET THE PIN CODE
        const pinCookie: any = process.env.PIN_CODE
        const pin = req.cookies.get(pinCookie)?.value || '';
        //GET THE TOKEN DATA
        const token = new getTokenData(req);
        const uId = token.userID();
        if (!uId){
            return NextResponse.json({
                msg: "You're not logged in.",
                code: 0
            })
        }
        //COUNT THE REQUIRED NUMBERS
        let newsCount = 0;
        newsCount = await NewsPost.countDocuments(
            {
                pin: pin
            }
        )
        let eventsCount = 0;
        eventsCount = await eventsPost.countDocuments(
            {
                pin: pin
            }
        )
        //----------------------------------------
        // COUNT PEOPLE - START
        //----------------------------------------
        let peopleCount;
        if (pin === '0000000') {
            //FOR GLOBAL - START
            peopleCount = await User.find({
                $and: [
                    { isActive: 1 },
                    { _id: { $ne: uId } }
                ]
            })
            //FOR GLOBAL - END
        } else {
            //FOR LOCAL - START
            peopleCount = await User.find({
                $and: [
                    { pinCode: parseInt(pin, 10) },
                    { isActive: 1 },
                    { _id: { $ne: uId } }
                ]
            })
            //FOR LOCAL - END
        }
        //----------------------------------------
        // COUNT PEOPLE - END
        //----------------------------------------
        //----------------------------------------
        // COUNT SECONDHAND - START
        //----------------------------------------
        let secondhandCount;
        if (pin === '0000000') {
            //FOR GLOBAL
            secondhandCount = await productSecondHand.find({})
        } else {
            secondhandCount = await productSecondHand.find({ productPin: parseInt(pin, 10) })
        }
        //----------------------------------------
        // COUNT SECONDHAND - END
        //----------------------------------------
        //----------------------------------------
        // COUNT GROUPS - START
        //----------------------------------------
        let groupsCount;
        //0000000 means GLOBAL VISIBLE
        if (pin === '0000000') {
            groupsCount = await groupsModels.find({});
        } else {
            groupsCount = await groupsModels.find({ groupPin: pin });
        }
        //----------------------------------------
        // COUNT GROUPS - END
        //----------------------------------------
        //----------------------------------------
        // WALLET BALANCE - START
        //----------------------------------------
        const walBal = await walletTransactions.findOne({ userId: uId }).sort({ slId: -1 });
        //----------------------------------------
        // WALLET BALANCE - END
        //----------------------------------------

        let offersCount = 0
        let marketCount = 0
        let businessCount = 0

        return NextResponse.json({
            newsCount,
            eventsCount,
            peopleCount: peopleCount.length,
            offersCount,
            marketCount,
            secondhandCount: secondhandCount.length,
            businessCount,
            groupsCount: groupsCount.length,
            walBal: walBal.currentBal,
        })

    }catch(err){
        return NextResponse.json({
            msg:err,
            code: 0
        })
    }
}