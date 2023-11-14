import connectDB from "@/app/db/config";
import customSearch from "@/app/lib/customSearch";
import getTokenData from "@/app/lib/getTokenData";
import peoplesCatModels from "@/app/models/peoples/peoplesCatModels";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();
        const { firstName, lastName, profession, gender, mobile, pinCode } = body

        try{
            const getData = new getTokenData(req)
            const userID = getData.userID()
            const todayDate = Date.now()

            console.log(userID)

            //SEARCH PROFESSION SLUG
            let professionSlug = "Others"
            const search = new customSearch();
            const searchRes = await peoplesCatModels.find({})
            searchRes.forEach((ele) => {
                const result = search.searchByCommaSeparated(profession, ele.tags);
                if (result) {
                    professionSlug = ele.categoryName
                }
            })

            const res = await User.findByIdAndUpdate(
                { _id: Object(userID) }, // Filter
                { 
                    firstName,lastName, 
                    profession,
                    professionSlug: professionSlug,
                    gender,
                    mobile,
                    pinCode,
                    updatedDate: todayDate 
                }, // Update
                { new: true } // Options
            );

            console.log(res)

            return NextResponse.json({
                msg: "Update success",
                code: 1,
                response: body
            })
        }catch(err){
            return NextResponse.json({
                msg: err,
                code: 0
            })
        }

    }catch(err){
        return NextResponse.json({
            msg:err,
            code:0
        })
    }
}