import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import messageLists from "@/app/models/message/message";
import productSecondHand from "@/app/models/products/secondHand";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { id,type } = body
        if (!id) {
            return NextResponse.json({
                msg: "No request Found",
                code: 0
            })
        }

        //GET THE ID
        let product:any;
        if (type === 'secondhand'){
            product = await productSecondHand.findById(id)
        }
         
        const nextId = new mongoose.Types.ObjectId(product.userId)
        //GET CURRENT USERID
        const token = new getTokenData(req);
        const uId = token.userID();

        if(uId.toString() === product.userId.toString()){
            return NextResponse.json({
                msg: "Same User",
                code: 0
            })
        }

        let msgId: String;
        //Firstly, Check if there is message with this user ID
        const check = await messageLists.find({
            $or: [
                { $and: [{ firstUser: Object(nextId) }, { secondUser: Object(uId) }] },
                { $and: [{ firstUser: Object(uId) }, { secondUser: Object(nextId) }] },
            ]
        }).limit(1).select('_id')
        if (check.length > 0) {
            //DATA EXISTS
            msgId = check[0]
        } else {
            //CREATE DATA
            const cursor = await messageLists.create({
                firstUser: Object(uId),
                secondUser: Object(nextId),
            })
            msgId = cursor._id
        }

        return NextResponse.json({
            msgId: msgId,
            code: 1
        })
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}