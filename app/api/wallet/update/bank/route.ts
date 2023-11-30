import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import walletBank from "@/app/models/wallet/walletBank";
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
        const { fullName, upiId } = body;
        if (!fullName && !upiId) {
            return NextResponse.json({
                msg: "Bad Request",
                code: 0
            })
        }

        //FIND THE BANK
        const wal = await walletBank.findOne({userId:uID})
        if(!wal){
            //INSERT NEW
            await walletBank.create({
                userId: uID,
                fullName:fullName,
                upiId: upiId,
                createdDate:Date.now()
            })
        }else{
            //UPDATE
            await walletBank.findOneAndUpdate({ userId: uID }, {
                fullName: fullName,
                upiId: upiId,
                updatedDate:Date.now()
            })
        }
        
        return NextResponse.json({
            msg: "Updated",
            code: 1
        })

    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}