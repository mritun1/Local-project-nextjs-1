import connectDB from "@/app/db/config";
import peoplesCatModels from "@/app/models/peoples/peoplesCatModels";
import { NextRequest, NextResponse } from "next/server";

/// CREATE CATEGORY
export async function POST(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();
        const {categoryName,tags} = body
        //INSERT INTO DATABASE
        try{
            const res = await peoplesCatModels.create({
                categoryName, tags
            })
        } catch (err) {
            return NextResponse.json({
                msg: err,
                code: 0
            })
        }
        
        return NextResponse.json({
            msg: "Success",
            code: 1
        })
    }catch(err){
        return NextResponse.json({
            msg:err,
            code:0
        })
    }
}