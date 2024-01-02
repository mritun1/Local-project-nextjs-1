import connectDB from "@/app/db/config";
import notificationsApp from "@/app/models/notifications/notificationsApp";
import notificationsMain from "@/app/models/notifications/notificationsMain";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();
        const { id, itemId, status, journal, notification, amount } = body
        console.log(journal)
        // Update the Wallet
        await walletTransactions.findOneAndUpdate(
            { _id: itemId }, 
            { $set: { status: status, journal: journal } } 
        )

        //UPDATE OR CREATE TO NOTIFICATION APP - START
        let activeCode = 0;
        if (status == 'Rejected') {
            activeCode = 1;
        }
        const walNotification = await notificationsApp.findOneAndUpdate(
            { userId: id, notificationType: 'wallet' },
            { $set: { message: notification, active: activeCode, updatedDate: Date.now() } },
            { new: true }
        )
        if (!walNotification) {
            await notificationsApp.create(
                {
                    userId: id,
                    notificationType: 'wallet',
                    message: notification,
                    active: activeCode,
                    updatedDate: Date.now()
                }
            )
        }
        //UPDATE OR CREATE TO NOTIFICATION APP - END

        //FOR REJECTED
        if (status == 'Rejected'){
            //CREATE TO NOTIFICATION MAIN - START
            await notificationsMain.create(
                { userId: id, sendType: 'one', notificationType: 'wallet', message: notification, createdDate:Date.now() }
            )
            //CREATE TO NOTIFICATION MAIN - END
            //GET THE LAST TRANSACTION DATA
            const lastData = await walletTransactions.findOne({ userId: id }).sort({ slId: -1 });
            if (lastData) {
                //INSERT TO DATABASE
                await walletTransactions.create({
                    userId: id,
                    slId: lastData.slId + 1,
                    transactionType: "Add(Refund)",
                    prevAmount: lastData.currentBal,
                    myPrevSlId: lastData.slId,
                    Amount: parseFloat(amount),
                    journal: journal,
                    currentBal: parseFloat(lastData.currentBal) + parseFloat(amount),
                    status: 'Success',
                    createdDate: Date.now()
                })
            }
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