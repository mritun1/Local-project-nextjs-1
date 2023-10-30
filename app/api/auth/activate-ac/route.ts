import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import connectDB from "@/app/db/config";

export async function PATCH(req:Request){
    try{
        await connectDB();
        
        const body = await req.json();
        const { mobile, otp } = body;
        //CHECK IF THE REQUEST EXISTS
        if (!mobile || !otp){
            return NextResponse.json({msg:"Request no full field.",code:0})
        }
        //CHECK IF REQUESTED ID EXISTS
        const isIdExist = await User.findOne({ mobile })
        if (!isIdExist){
            return NextResponse.json({msg:"Bad Request",code:0})
        }

        //COMPARE THE OTP
        const hasOtp:any = isIdExist.otp;
        try{
            const isValidOtp = await bcrypt.compare(otp,hasOtp)
            if(!isValidOtp){
                return NextResponse.json({ msg: "OTP is not valid.", code: 0 })
            }
            //SET USER AS ACTIVE
            try{
                await User.findOneAndUpdate({ mobile: mobile }, { isActive: 1 })
                //REMOVE THE IS_USER_ACTIVE COOKIE
                const response = NextResponse.json({ msg: "Thank you, your account is activated", code: 1 })
                const isUserActive: any = process.env.IS_USER_ACTIVE
                response.cookies.delete(isUserActive)
                return response
            }catch(err){
                return NextResponse.json({ msg: err, code: 0 })
            }
            
        }catch(error){
            return NextResponse.json({ msg: error, code: 0 })
        }
    }catch(err){
        return NextResponse.json({msg:err,code:0})
    }
}