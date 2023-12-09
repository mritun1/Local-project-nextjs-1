import customSearch from "@/app/lib/customSearch";
import peopleCats from "@/app/json/peopleCats.json"
import { NextResponse } from "next/server";

export async function GET(){
    //SEARCH PROFESSION SLUG
    let professionSlug = "Others"
    const search = new customSearch();
    peopleCats.forEach((ele) => {
        const result = search.searchByCommaSeparated('web developers', ele.tags);
        if (result) {
            professionSlug = ele.categoryName
        }
    })
    return NextResponse.json({
        mgs: professionSlug
    })
}