import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validate from "@/app/lib/validate";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const { firstName, lastName, pinCode, mobile, password, confirmPassword, profession, gender } = body;
        //CHECK IF ALL THE INPUTS WERE DONE
        if (!firstName || !lastName || !pinCode || !mobile || !password || !confirmPassword || !profession || !gender) {
            return NextResponse.json(
                { msg: "Please, don`t leave empty fields.", code: 0 }

            )
        }

        const Valid = new validate()
        //VALIDATE THE PASSWORD
        if (!Valid.password(password)){
            return NextResponse.json(
                {msg:"Password should be 8 characters long",code:0}
            )
        }
        //VALIDATE MOBILE
        if (!Valid.mobile(mobile)){
            return NextResponse.json(
                { msg: "Mobile number not valid", code: 0 }
            )
        }
        //VALIDATE PIN CODE
        if (!Valid.pinCode(pinCode)) {
            return NextResponse.json(
                { msg: "Pin Code not valid", code: 0 }
            )
        }

        //CHECK IF PASSWORD MATCHING
        if (password != confirmPassword){
            return NextResponse.json(
                {msg:"Sorry! password not match.",code:0}
            )
        }
        //CHECK IF USER EXISTS
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
            const newUser = new User({ firstName, lastName, pinCode, gender, profession, mobile, password: hashPassword, otp: hashOtp });
            newUser.save()
            
            const user_id = newUser._id
            const secret: any = process.env.SECRECT_KEY
            const token = jwt.sign({ user_id, firstName, lastName, pinCode, mobile }, secret)
            const isUserActiveCookie = jwt.sign({code:"zero"}, secret)
            const response = NextResponse.json(
                { msg: "Welcome! you are registered success.", code: 1, id: user_id, mobile:mobile }

            )
            const logCookie: any = process.env.LOGIN_COOKIE
            const isUserActive: any = process.env.IS_USER_ACTIVE
            response.cookies.set(logCookie, token)
            response.cookies.set(isUserActive,isUserActiveCookie)
            return response
            
        } catch (error) {
            return NextResponse.json({ msg: error, code: 0 })
        }
        

    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong " + error, code: 0 })
    }
}