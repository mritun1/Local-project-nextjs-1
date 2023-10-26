import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req:Request) {
    try{
        await connectDB()
        const body = await req.json()
        const {mobile} = body
        //Find If mobile number exists
        const isMobile = await User.findOne({mobile:mobile})
        if(!isMobile){
            return NextResponse.json({
                msg:"Mobile number not exist.",
                code:0
            })
        }
        //CREATE NEW PASSWORD
        const newPassword = "123"
        const newPasswordHash = await bcrypt.hash(newPassword,10)
        //REPLACE THE OLD PASSWORD WITH NEW PASSWORD
        try {
            await User.findOneAndUpdate(
                { mobile: mobile },
                { password: newPasswordHash }
            )
            //SEND THE PASSWORD TO MOBILE NUMBER
            //-------

            return NextResponse.json({
                msg: "A new password was sent to your mobile number. Please see your message inbox and login. And reset your password as soon as you log in.",
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