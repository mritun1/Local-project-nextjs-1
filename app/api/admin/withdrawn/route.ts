import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import walletBank from "@/app/models/wallet/walletBank";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        await connectDB();

        const cursor = await walletTransactions.find({ transactionType:'Withdrawn'}).sort({ createdDate: -1 })
        const withdrawnData = [];

        // Use for...of loop to iterate over async functions sequentially
        for (const ele of cursor) {
            const u = await User.findOne(ele.userId);
            const w = await walletBank.findOne({ userId : ele.userId});
            withdrawnData.push({
                item: ele,
                userName: u.firstName + ' ' + u.lastName,
                upiFullName: w.fullName,
                upiId: w.upiId,
                mobile: u.mobile,
                uId: u._id
            });
        }

        return NextResponse.json({
            data: withdrawnData,
            code: 1
        })

    }catch(error){
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}