import User from "@/app/models/userModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import connectDB from "@/app/db/config";

export async function POST(req:Request){
    try{
        connectDB();
        const body = await req.json();
        const { _id, otp } = body;
        //CHECK IF THE REQUEST EXISTS
        if(!_id || !otp){
            return NextResponse.json({msg:"Request no full field.",code:0})
        }
        const objId = new mongoose.Types.ObjectId(_id)
        //CHECK IF REQUESTED ID EXISTS
        try{
            const isIdExist = await User.findById(objId).maxTimeMS(30000);
            if (!isIdExist){
                return NextResponse.json({msg:"Bad Request",code:0})
            }
            //COMPARE THE OTP
            const hasOtp:any = isIdExist.otp;
            console.log(hasOtp)
            try{
                const isValidOtp = await bcrypt.compare(otp,hasOtp)
                if(!isValidOtp){
                    return NextResponse.json({ msg: "OTP is not valid.", code: 0 })
                }
                //SET USER AS ACTIVE
                try{
                    await User.findOneAndUpdate({ _id: objId }, { isActive: 1 })
                    return NextResponse.json({ msg: "Thank you, your account is activated", code: 1 })
                }catch(err){
                    return NextResponse.json({ msg: err, code: 0 })
                }
                
            }catch(error){
                return NextResponse.json({ msg: error, code: 0 })
            }
        }catch(err){
            console.log(err)
            return NextResponse.json({ msg: err, code: 0 })
        }
    }catch(err){
        console.log(err)
        return NextResponse.json({msg:err,code:0})
    }
}