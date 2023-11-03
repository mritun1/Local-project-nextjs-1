import { NextRequest, NextResponse } from "next/server"
import { Storage } from '@google-cloud/storage';
import draftNewsPost from "@/app/models/posts/draftNewsPost";
import getTokenData from "@/app/lib/getTokenData";
import draftEventsPost from "@/app/models/posts/draftEventsPost";

export async function DELETE(req:NextRequest){
    try {
        const { id,service } = await req.json();

        const token = new getTokenData(req)
        const userID = token.userID()

        const storage = new Storage({
            keyFilename: process.env.GCP_SERVICE_KEY,
            projectId: process.env.GCP_PROJECT_ID
        })
        const bucketName: any = process.env.GCP_BUCKET_NAME
        const imgUpload = storage.bucket(bucketName)

        try{
            await imgUpload.file(id).delete()

            //INSERT THE IMAGE INTO DATABASE
            if (service === 'news') {
                await draftNewsPost.findOneAndUpdate({ userId: userID }, {
                    $pull: {
                        images: "https://storage.googleapis.com/localnii-testing/" + id
                    }
                }, { new: true })
            }
            if (service === 'events') {
                await draftEventsPost.findOneAndUpdate({ userId: userID }, {
                    $pull: {
                        images: "https://storage.googleapis.com/localnii-testing/" + id
                    }
                }, { new: true })
            }

            return NextResponse.json({
                msg: "Image Deleted Success",
                code: 1
            })
        }catch(err){
            return NextResponse.json({
                msg: err,
                code: 0
            })
        }
    } catch (error) {
        return NextResponse.json({
            msg:error,
            code:0
        })
    }

}