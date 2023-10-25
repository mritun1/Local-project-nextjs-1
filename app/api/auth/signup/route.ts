import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const { firstName, lastName, pinCode, mobile, password, profession, gender } = body;
        if (!firstName || !lastName || !pinCode || !mobile || !password || !profession || !gender) {
            return NextResponse.json(
                { msg: "Please, don`t leave empty fields.", code: 0 }

            )
        }

        const isUserPresent = await User.findOne({ mobile });
        if (isUserPresent) {
            return NextResponse.json(
                { msg: "User already exists.", code: 0 }

            )
        }

        let newPassword = password.toString();
        const hashPassword = await bcrypt.hash(newPassword, 10)

        let otp:string = "234";
        const hashOtp = await bcrypt.hash(otp, 10)

        try {
            // const newUser = await User.create({ firstName, lastName, pinCode, gender, profession, mobile, password: hashPassword, otp: hashOtp });
            const newUser = new User({ firstName, lastName, pinCode, gender, profession, mobile, password: hashPassword, otp: hashOtp });
            newUser.save()
            
            const user_id = newUser._id
            const secret: any = process.env.SECRECT_KEY
            const token = jwt.sign({ user_id, firstName, lastName, pinCode, mobile }, secret)
            const response = NextResponse.json(
                { msg: "Welcome! you are registered success.", code: 1, id: user_id, mobile:mobile }

            )
            const logCookie: any = process.env.LOGIN_COOKIE
            response.cookies.set(logCookie, token)
            return response
            
        } catch (error) {
            return NextResponse.json({ msg: error, code: 0 })
        }
        

    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong " + error, code: 0 })
    }
}