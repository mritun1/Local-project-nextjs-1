import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import User from "@/app/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import validate from "@/app/lib/validate";

export async function PATCH(req:NextRequest){
    try{
        await connectDB()
        const body = await req.json()
        const { oldPass, newPass, confirmPass} = body
        //CHECK IF THE PASSWORD MATCHING
        if(newPass != confirmPass){
            return NextResponse.json({
                msg: "Your new password and confirm password not matching",
                code: 0
            })
        }
        //CHECK IF VALID PASSWORD
        const valid = new validate()
        if(!valid.password(newPass)){
            return NextResponse.json({
                msg: "Sorry, Your password should be 8 Characters long and strong.",
                code: 0
            })
        }

        //CHECK IF THE OLD PASSWORD EXISTS
        const tokenData = new getTokenData(req)
        const userID = tokenData.userID()
        const existData = await User.findById({_id:userID})
        if(!existData){
            return NextResponse.json({
                msg: "Sorry, User not exists",
                code: 0
            })
        }

        const existsPass = existData.password
        //MATCH THE OLD PASSWORD
        const match = await bcrypt.compare(oldPass.toString(),existsPass)
        if(!match){
            return NextResponse.json({
                msg: "Your Old password not matching",
                code: 0
            })
        }
        // UPDATE THE NEW PASSWORD
        const newPassHash = await bcrypt.hash(newPass.toString(),10)
        await User.findByIdAndUpdate({_id:userID},{password:newPassHash})
        return NextResponse.json({
            msg: "Success, password updated",
            code: 1
        })

        
    }catch(err){
        return NextResponse.json({
            msg: err,
            code:0
        })
    }
}