import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import productSecondHandDraft from "@/app/models/products/secondHandDraft";
import productSecondHand from "@/app/models/products/secondHand";

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        //GET Draft Data
        const getDraft = await productSecondHandDraft.findOne({ userId: userID })
        //Check and create the draft post
        const createDraft = await productSecondHand.create({
            productName: getDraft.productName,
            productDes: getDraft.productDes,
            productPrice: getDraft.productPrice,
            productOld: getDraft.productOld,
            productPin: getDraft.productPin,
            productCategory: getDraft.productCategory,
            contact1: getDraft.contact1,
            contact2: getDraft.contact2,
            images: getDraft.images,
            userId: getDraft.userId,
            createdDate: Date.now(),
        })
        if (createDraft) {
            //DELETE FROM DRAFT
            await productSecondHandDraft.deleteOne({ userId: userID })
        }
        return NextResponse.json({
            msg: "Product created success",
            code: 1,
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}

export async function PUT(req: NextRequest) {
    try {
        await connectDB()
        const body = await req.json()
        const { 
            id,
            productName,
            productDes,
            productPrice,
            productOld,
            contact1,
            contact2,
            productCategory
         } = body
        //Check if the token exists
        const getToken = new getTokenData(req)
        const userID = getToken.userID()
        if (!getToken || !userID) {
            return NextResponse.json({
                msg: "Sorry, you are not loggedIn",
                code: 0
            })
        }
        //Update the events
        await productSecondHand.findByIdAndUpdate(id, {
            productName,
            productDes,
            productPrice,
            productOld,
            contact1,
            contact2,
            productCategory,
            updatedDate: Date.now()
        });
        return NextResponse.json({
            msg: "Second Hand Updated success",
            code: 1,
        })
    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}

