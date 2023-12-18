import customSearch from "@/app/lib/customSearch";
import peopleCats from "@/app/json/peopleCats.json"
import { NextResponse } from "next/server";
import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";

// http://127.0.0.1:3000/api/initialize/change-profession

export async function GET() {
    try{
        await connectDB();

        const userLists = await User.find({ isActive:1})
        const data: any[] = []
        userLists.forEach(async (item,index)=>{
            //data.push(ele.firstName)
            //SEARCH PROFESSION SLUG
            let professionSlug = "Others"
            let categoryName = "Others"
            const search = new customSearch();
            peopleCats.forEach((ele) => {
                const result = search.searchByCommaSeparated(item.profession, ele.tags);
                if (result) {
                    professionSlug = ele.catSlug,
                    categoryName = ele.categoryName
                }
            })
            //data.push(professionSlug)
            //INSERT INTO DATABASE
            await User.findByIdAndUpdate(item._id,{
                professionSlug: professionSlug,
                professionName: categoryName
            })
        })

        const newUserLists = await User.find({ isActive: 1 })
        return NextResponse.json({
            mgs: newUserLists
        })

    }catch(error){
        return NextResponse.json({
            mgs: error
        })
    }

    
}