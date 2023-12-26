import connectDB from "@/app/db/config";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();
        const { id, status, journal } = body
        console.log(journal)
        //Update the Wallet
        // await walletTransactions.findOneAndUpdate(
        //     { _id: id }, 
        //     { $set: { status: status, journal: journal } } 
        // )

        return NextResponse.json({
            code: 1,
            msg: status
        })

    }catch(error){
        console.log(error)
        return NextResponse.json({
            code:0,
            msg:error
        })
    }
}