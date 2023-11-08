import getTokenData from "@/app/lib/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from '@google-cloud/storage';
import eventsPost from "@/app/models/posts/eventsPost";
import NewsPost from "@/app/models/posts/newsPost";

export async function DELETE(req: NextRequest) {
    try{
        const body = await req.json();
        const { id, postType } = body;

        const token = new getTokenData(req);
        const uId = token.userID();
        if(!token && !uId){
            return NextResponse.json({
                msg: "You are not logged in.",
                code: 0
            })
        }

        //CONNECT TO GCP CLOUD STORAGE
        const storage = new Storage({
            keyFilename: process.env.GCP_SERVICE_KEY,
            projectId: process.env.GCP_PROJECT_ID
        })
        const bucketName: any = process.env.GCP_BUCKET_NAME
        const imgUpload = storage.bucket(bucketName)

        //GET ALL THE IMAGES
        if(postType === "Event"){
            const imgAll = await eventsPost.findOne({ _id: Object(id)});
            //DELETE IMAGES
            const imgs = imgAll.images;
            if (imgs.length > 0){
                imgs.forEach(async (ele: string) => {
                    const imgName = ele.replace("https://storage.googleapis.com/localnii-testing/", "");
                    await imgUpload.file(imgName).delete();
                });
            }
            //DELETE EVENT
            await eventsPost.findOneAndDelete({_id:Object(id),userId:uId});
        }
        if (postType === "News") {
            const imgAll = await NewsPost.findOne({ _id: Object(id) });
            //DELETE IMAGES
            const imgs = imgAll.images;
            if (imgs.length > 0) {
                imgs.forEach(async (ele: string) => {
                    const imgName = ele.replace("https://storage.googleapis.com/localnii-testing/", "");
                    await imgUpload.file(imgName).delete();
                });
            }
            //DELETE EVENT
            await NewsPost.findOneAndDelete({ _id: Object(id), userId: uId });
        }

        return NextResponse.json({
            msg: "Deleted Success",
            code: 0
        })
    }catch(error){
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}