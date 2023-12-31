import connectDB from "@/app/db/config";
import notificationsApp from "@/app/models/notifications/notificationsApp";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();
        const { id, status, journal, notification } = body
        console.log(journal)
        // Update the Wallet
        await walletTransactions.findOneAndUpdate(
            { _id: id }, 
            { $set: { status: status, journal: journal } } 
        )
        //FOR REJECTED
        if (status == 'Rejected'){
            //UPDATE OR CREATE TO NOTIFICATION APP - START
            const walNotification = await notificationsApp.findOneAndUpdate(
                { userId: id, notificationType: 'wallet'},
                { $set: { message: notification, active: 1, updatedDate:Date.now() } },
                { new: true }
            )
            if(!walNotification){
                await notificationsApp.create(
                    {
                        userId:id,
                        notificationType: 'wallet',
                        message: notification, 
                        active: 1, 
                        updatedDate: Date.now()
                    }
                )
            }
            //UPDATE OR CREATE TO NOTIFICATION APP - END
            //CREATE TO NOTIFICATION MAIN - START
            await notificationsMain.create(
                { userId: id, sendType: 'one', notificationType: 'wallet', message: notification, createdDate:Date.now() }
            )
            //CREATE TO NOTIFICATION MAIN - END
        }

        return NextResponse.json({
            code: 1,
            msg: status,
        })

    }catch(error){
        console.log(error)
        return NextResponse.json({
            code:0,
            msg:error
        })
    }
}