import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import userModels from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const token = new getTokenData(req);
        const uId = token.userID();
        if (!token && !uId) {
            return NextResponse.json({
                msg: "Not logged In",
                code: 0
            })
        }
        //GET REFERRAL LISTS
        const cursor = await userModels.find({ refID: uId, isActive : 1}).sort({createdDate:-1})
        const totalPaid = await userModels.find({ refID: uId, isActive: 1, refPaid:{$gt:0} })
        const totalUnPaid = cursor.length - totalPaid.length
        //RETURN
        return NextResponse.json({
            msg: "Found",
            uId: uId,
            data: cursor,
            length: cursor.length,
            totalPaid: totalPaid.length,
            totalUnPaid: totalUnPaid,
            code: 1
        })

    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}