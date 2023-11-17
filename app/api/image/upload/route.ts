import connectDB from "@/app/db/config";
import { NextRequest, NextResponse } from "next/server";
import { Storage } from '@google-cloud/storage';
import { join } from "path";
import { writeFile } from "fs";
import fs from 'fs';
import getTokenData from "@/app/lib/getTokenData";
import draftNewsPost from "@/app/models/posts/draftNewsPost";
import draftEventsPost from "@/app/models/posts/draftEventsPost";
import NewsPost from "@/app/models/posts/newsPost";
import eventsPost from "@/app/models/posts/eventsPost";
import customMath from "@/app/lib/customMath";
import User from "@/app/models/userModels";
import productSecondHandDraft from "@/app/models/products/secondHandDraft";
import productSecondHand from "@/app/models/products/secondHand";

export async function POST(req:NextRequest){
    try{
        await connectDB()
        const formData = await req.formData()
        const img: File = formData.get("imgFile") as File
        const service:String = formData.get("service") as String
        const serviceType: String = formData.get("serviceType") as String
        const postId: String = formData.get("postId") as String
        //IF IMAGE EXISTS
        if(!img){
            return NextResponse.json({
                msg:"Sorry, no image found",
                code:0
            })
        }

        //GET THE TOKEN DATA
        const token = new getTokenData(req)
        const userID = token.userID()
        if(!userID){
            return NextResponse.json({
                msg: "Sorry, you are not logged In.",
                code: 0
            })
        }

        const bytes = await img.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join("uploaded/", img.name)
        writeFile(path, buffer, 'utf8', (err) => {
            if (err) {
                return NextResponse.json({
                    msg: err,
                    code: 0
                })
            } 
        });

        const storage = new Storage({
            keyFilename: process.env.GCP_SERVICE_KEY,
            projectId: process.env.GCP_PROJECT_ID
        })
        // storage.getBuckets().then((x)=>console.log(x))
        const bucketName: any = process.env.GCP_BUCKET_NAME
        const imgUpload = storage.bucket(bucketName)

        try {

            const math = new customMath();
            const ran: number = math.randomNum(1000);
            const imgName: string = ran + `_` + img.name;

            const options = {
                destination: imgName,
            };

            const newImg = await imgUpload.upload("uploaded/" + img.name, options);
            console.log("Image uploaded at path: " + newImg);

            // Construct the public URL for the uploaded image
            const publicURL = `https://storage.googleapis.com/${bucketName}/${imgName}`;

            //INSERT THE IMAGE INTO DATABASE
            if (serviceType === 'draft'){
                if(service === 'news'){
                    await draftNewsPost.findOneAndUpdate({userId:userID},{
                        $push:{
                            images: publicURL
                        }
                    },{new:true})
                }
                if (service === 'events') {
                    await draftEventsPost.findOneAndUpdate({ userId: userID }, {
                        $push: {
                            images: publicURL
                        }
                    }, { new: true })
                }
                if (service === 'secondHand') {
                    await productSecondHandDraft.findOneAndUpdate({ userId: userID }, {
                        $push: {
                            images: publicURL
                        }
                    }, { new: true })
                }
            }
            if (serviceType === 'published') {
                if (service === 'news1') {
                    await NewsPost.findOneAndUpdate({ _id: Object(postId) }, {
                        $push: {
                            images: publicURL
                        }
                    }, { new: true })
                }
                if (service === 'events1') {
                    await eventsPost.findOneAndUpdate({ _id: Object(postId) }, {
                        $push: {
                            images: publicURL
                        }
                    }, { new: true })
                }
                if (service === 'secondHand') {
                    await productSecondHand.findOneAndUpdate({ userId: userID }, {
                        $push: {
                            images: publicURL
                        }
                    }, { new: true })
                }
            }
            //PROFILE IMAGES
            if (serviceType === 'profile') {
                if (service === 'profile_img') {
                    //FIND PREVIOUS IMAGE
                    const usr = await User.findById({ _id: Object(userID) })
                    //DELETE PREVIOUS IMAGE
                    const rm = `https://storage.googleapis.com/localnii-testing/`
                    if (usr && usr.profilePic) {
                        const oldImg = usr.profilePic;
                        const delImg = oldImg.replace(rm, "");
                        await imgUpload.file(delImg).delete()
                    }
                    //UPDATE NEW IMAGE TO DATABASE
                    await User.findByIdAndUpdate({ _id: Object(userID) }, { profilePic:publicURL})
                }
            }

            fs.unlink("uploaded/" + img.name, error => {
                if (error) {
                    return NextResponse.json({
                        msg: error,
                        code: 0
                    })
                }
            })

            return NextResponse.json({
                msg: "Image uploaded success",
                id:postId,
                image: publicURL,
                code: 1
            })

        } catch (error) {
            return NextResponse.json({
                msg: error,
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