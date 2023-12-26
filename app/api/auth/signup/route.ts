import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validate from "@/app/lib/validate";
import customSearch from "@/app/lib/customSearch";
import sms from "@/app/customlib/sms";
import customMath from "@/app/lib/customMath";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import peopleCats from "@/app/json/peopleCats.json"

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const { firstName, lastName, pinCode, mobile, password, confirmPassword, profession, gender, refID } = body;
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

        const ran = new customMath();
        const ranNum:number = ran.randomNum(10000);

        let otp: string = ranNum.toString();
        // let otp:string = "234";

        // SEND OTP TO MOBILE
        const OTP = new sms();
        const sendOtp = OTP.singleOTP(mobile.toString(),otp);
        if (sendOtp === null){
            return NextResponse.json({ msg: "Sms not sent, something wrong.", code: 0 });
        }

        const hashOtp = await bcrypt.hash(otp, 10)

        //SEARCH PROFESSION SLUG
        let professionSlug = "Others"
        let categoryName = "Others"
        const search = new customSearch();
        peopleCats.forEach((ele) => {
            const result = search.searchByCommaSeparated(profession, ele.tags);
            if (result) {
                professionSlug = ele.catSlug,
                categoryName = ele.categoryName
            }
        })

        try {
            let newUser:any;
            if (refID){
                //REFERRAL IS SET
                //ADD MONEY TO THE REFERRER ACCOUNT
                const referAmount: number = 100;
                const lastData2 = await walletTransactions.findOne({ userId: refID }).sort({ slId: -1 });
                if (lastData2) {
                    //INSERT TO TRANSACTION
                    const currentBalValue: number = parseFloat(lastData2.currentBal);
                    const updatedCurrentBal: number = currentBalValue + referAmount;
                    await walletTransactions.create({
                        userId: refID,
                        slId: lastData2.slId + 1,
                        transactionType: "Received",
                        prevAmount: lastData2.currentBal,
                        myPrevSlId: lastData2.slId,
                        Amount: referAmount,
                        currentBal: updatedCurrentBal,
                        status: 'Success',
                        createdDate: Date.now()
                    })
                }
                newUser = new User({ firstName, lastName, pinCode, gender, profession, professionSlug: professionSlug, professionName: categoryName, mobile, contacts: mobile, contactPermission: "Sell", refID, refPaid: referAmount, password: hashPassword, otp: hashOtp });
            }else{
                newUser = new User({ firstName, lastName, pinCode, gender, profession, professionSlug: professionSlug, professionName: categoryName, mobile, contacts: mobile, contactPermission: "Sell", password: hashPassword, otp: hashOtp });
            }
            newUser.save()

            const user_id = newUser._id

            //GET PRICE MONEY FOR JOINING
            //ADD MONEY TO THE ACCOUNT
            const joinGift: number = 100;
            //INSERT TO TRANSACTION
            await walletTransactions.create({
                userId: user_id,
                slId: 1,
                transactionType: "Received",
                prevAmount: 0,
                myPrevSlId: 0,
                Amount: joinGift,
                currentBal: joinGift,
                status: 'Success',
                createdDate: Date.now()
            })

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
            //SET PIN CODE IN COOKIE
            const pinCookie: any = process.env.PIN_CODE
            // response.cookies.set(pinCookie, pinCode)
            response.cookies.set(pinCookie, '0000000');
            return response
            
        } catch (error) {
            return NextResponse.json({ msg: error, code: 0 })
        }
        

    } catch (error) {
        return NextResponse.json({ msg: "Something went wrong " + error, code: 0 })
    }
}