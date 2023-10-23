import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        connectDB();
        const body = await req.json();

        const { mobile, password } = body;
        if ( !mobile || !password ) {
            return NextResponse.json(
                { msg: "Please, don`t leave empty fields.", code: 0 }
                
            )
        }

        const isUserPresent = await User.findOne({ mobile });
        if (!isUserPresent) {
            return NextResponse.json(
                { msg: "User not exists, please register", code: 0 }
                
            )
        }
        const gotPassword:any = isUserPresent.password
        
        try {
            
            const isMatch = await bcrypt.compare(password.toString(), gotPassword)
            if (isMatch){
                const name = isUserPresent.firstName + ' ' + isUserPresent.lastName
                const pin_code = isUserPresent.pinCode
                const mobile = isUserPresent.mobile

                const secret: any = process.env.SECRECT_KEY
                const token = jwt.sign({ name, pin_code, mobile }, secret)
                const response = NextResponse.json(
                    { msg: "Welcome! to Localnii.", code: 1 }
                    
                )
                const logCookie: any = process.env.LOGIN_COOKIE
                response.cookies.set(logCookie, token)
                return response
            }else{
                return NextResponse.json({ msg: "Sorry! Wrong Password", code: 0 })
            }
            
        } catch (error) {
            return NextResponse.json({ msg: error,code:0 })
        }
    } catch (error) {
        return NextResponse.json({ error: error, code: 0 })
    }
}