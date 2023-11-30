import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        //GET THE USER ID
        const token = new getTokenData(req);
        const uID = token.userID();
        if (!token && !uID) {
            return NextResponse.json({
                msg: "You are not logged In",
                code: 0
            })
        }

        //GET THE BODY REQUEST
        const body = await req.json();
        const { amount } = body;
        if (!amount) {
            return NextResponse.json({
                msg: "Bad Request",
                code: 0
            })
        }

        //GET THE LAST TRANSACTION DATA
        const lastData = await walletTransactions.findOne({ userId: uID }).sort({ slId: -1 });
        if (lastData.currentBal >= amount){
            if (lastData) {
                //INSERT TO DATABASE
                await walletTransactions.create({
                    userId: uID,
                    slId: lastData.slId + 1,
                    transactionType: "Withdrawn",
                    prevAmount: lastData.currentBal,
                    myPrevSlId: lastData.slId,
                    Amount: parseInt(amount),
                    currentBal: parseInt(lastData.currentBal) - parseInt(amount),
                    status: 'Pending',
                    createdDate: Date.now()
                })
            }
        }else{
            return NextResponse.json({
                msg: "Sorry you don't have sufficient balance.",
                code: 0
            })
        }

        return NextResponse.json({
            msg: "Inserted",
            code: 1
        })

    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}