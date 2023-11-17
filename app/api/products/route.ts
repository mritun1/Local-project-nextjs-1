import connectDB from "@/app/db/config";
import productCategories from "@/app/models/products/productsModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const { catName, catSlug } = body;
        await connectDB();
        try{
            const res = await productCategories.create({ categoryName: catName, categorySlug: catSlug })
            return NextResponse.json({
                data: res,
                code: 1
            })
        }catch(err){
            return NextResponse.json({
                msg: err,
                code: 0
            })
        }
    }catch(err){
        console.log(err)
        return NextResponse.json({
            msg: err,
            code:0
        })
    }
}