import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";
import { parentPort } from "worker_threads";

export async function POST(req:NextRequest){
    try{
        await connectDB();

        //GET THE USER ID
        const token = new getTokenData(req);
        const uID = token.userID();
        if(!token && !uID){
            return NextResponse.json({
                msg: "You are not logged In",
                code:0
            })
        }

        //GET THE BODY REQUEST
        const body = await req.json();
        const {amount, journal} = body;
        if (!amount && !journal) {
            return NextResponse.json({
                msg: "Bad Request",
                code: 0
            })
        }

        //GET THE LAST TRANSACTION DATA
        const lastData = await walletTransactions.findOne({ userId: uID }).sort({ slId:-1});

        if (lastData){
            //INSERT TO DATABASE
            await walletTransactions.create({
                userId: uID,
                slId: lastData.slId + 1,
                transactionType: "Add",
                prevAmount: lastData.currentBal,
                myPrevSlId: lastData.slId,
                Amount: parseFloat(amount),
                journal: journal,
                currentBal: parseFloat(lastData.currentBal) + parseFloat(amount),
                status: 'Success',
                createdDate: Date.now()
            })
        }else{
            //INSERT TO DATABASE
            await walletTransactions.create({
                userId: uID,
                slId: 1,
                transactionType: "Add",
                prevAmount: 0,
                myPrevSlId: 0,
                Amount: parseFloat(amount),
                journal: journal,
                currentBal: parseFloat(amount),
                status: 'Success',
                createdDate: Date.now()
            })
        }

        return NextResponse.json({
            msg: "Inserted",
            code: 1
        })

    }catch(error){
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}