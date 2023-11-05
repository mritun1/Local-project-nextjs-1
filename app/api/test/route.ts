import { NextResponse } from "next/server";
import LinkedList from "@/app/lib/dsa/linkedList/linkedList";
import NewsPost from "@/app/models/posts/newsPost";
import eventsPost from "@/app/models/posts/eventsPost";

export async function GET(){
    try {
        const linkedList = new LinkedList();

        const eventsPostData = await eventsPost.find({});
        eventsPostData.forEach(ele => {
            linkedList.insertToArray(ele)
        });

        const NewsPostData = await NewsPost.find({});
        NewsPostData.forEach(ele=>{
            linkedList.insertToArray(ele)
        });

        const test = linkedList.printArray();

        test.sort((a, b) => b.createdDate - a.createdDate)

        return NextResponse.json({
            data: test,
            date: Date.now(),
            msg: "Lists of Data",
            code: 1
        });
    }catch(err){
        return NextResponse.json({
            msg:err,
            code:0
        })
    }
}