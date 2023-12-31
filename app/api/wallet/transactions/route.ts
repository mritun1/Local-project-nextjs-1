import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import notificationsApp from "@/app/models/notifications/notificationsApp";
import walletBank from "@/app/models/wallet/walletBank";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        //GET THE TOKEN
        const getData = new getTokenData(req)
        const uId = getData.userID();
        if (!getData && !uId) {
            return NextResponse.json({
                msg: "Sorry, not Logged In",
                code: 0
            })
        }

        //GET THE LISTS OF TRANSACTIONS
        const data = await walletTransactions.find({ userId: uId }).sort({ slId:-1});
        if(data.length > 0){

            //GET THE LATEST ONE DATA
            const dataLast = await walletTransactions.findOne({ userId: uId }).sort({ slId: -1 });
            //GET THE BANK
            const bank = await walletBank.findOne({userId:uId})
            let fullName = '';
            let upiId = '';
            if (bank){
                fullName= bank.fullName;
                upiId= bank.upiId;
            }

            //CHECK FOR THE APP NOTIFICATION - START
            const notificationApp = await notificationsApp.findOne({ userId: uId, notificationType: 'wallet' });
            let notificationAppCode = false;
            if(notificationApp){
                notificationAppCode = true;
            }
            //CHECK FOR THE APP NOTIFICATION - END

            return NextResponse.json({
                msg: "Success",
                data: data,
                bal: dataLast.currentBal,
                notificationAppCode,
                notificationApp,
                fullName: fullName,
                upiId: upiId,
                code:1
            })
        }else{
            return NextResponse.json({
                msg:"No data found",
                code:0
            })
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({
            msg: error,
            code:0
        })
    }
}