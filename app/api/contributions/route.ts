import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import contributions from "@/app/models/contribution/contributions";
import eventsPost from "@/app/models/posts/eventsPost";
import NewsPost from "@/app/models/posts/newsPost";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDB();
        const body = await req.json();
        const { itemId, itemType, amount, comment } = body;
        if(!body){
            return NextResponse.json({
                msg: "Bad Request",
                code: 0
            })
        }
        const token = new getTokenData(req);
        const uId = token.userID();
        if(!token && !uId){
            return NextResponse.json({
                msg: "Not logged In",
                code: 0
            })
        }
        //GET THE ITEM OWNER ID
        let receiverId = '';
        if(itemType === 'News'){
            const itemData = await NewsPost.findById({ _id:itemId })
            receiverId = itemData.userId
        }
        if (itemType === 'Events') {
            const itemData = await eventsPost.findById({ _id:itemId })
            receiverId = itemData.userId
        }
        //CHECKING THE AMOUNT
        const lastData = await walletTransactions.findOne({ userId: uId }).sort({ slId: -1 });
        if (lastData){
            if (lastData.currentBal >= amount) {
                //INSERT A CONTRIBUTION
                await contributions.create({
                    userId:uId,
                    itemType:itemType,
                    itemId:itemId,
                    amount:amount,
                    comments:comment,
                    createdDate:Date.now()
                })
                //INSERT TO SENDER TRANSACTION
                const lastData = await walletTransactions.findOne({ userId: uId }).sort({ slId: -1 });
                if (lastData.currentBal >= amount) {
                    if (lastData) {
                        //INSERT TO SENDER TRANSACTION
                        await walletTransactions.create({
                            userId: uId,
                            slId: lastData.slId + 1,
                            transactionType: "Sent",
                            prevAmount: lastData.currentBal,
                            myPrevSlId: lastData.slId,
                            Amount: parseFloat(amount),
                            currentBal: parseFloat(lastData.currentBal) - parseFloat(amount),
                            status: 'Success',
                            createdDate: Date.now()
                        })
                    }
                }
                //INSERT TO RECEIVER TRANSACTION
                const lastData2 = await walletTransactions.findOne({ userId: receiverId }).sort({ slId: -1 });
                if (lastData2.currentBal >= amount) {
                    if (lastData2) {
                        //INSERT TO SENDER TRANSACTION
                        await walletTransactions.create({
                            userId: receiverId,
                            slId: lastData2.slId + 1,
                            transactionType: "Received(Contribute)",
                            prevAmount: lastData2.currentBal,
                            myPrevSlId: lastData2.slId,
                            Amount: parseFloat(amount),
                            currentBal: parseFloat(lastData2.currentBal) + parseFloat(amount),
                            status: 'Success',
                            createdDate: Date.now()
                        })
                    }
                }
                return NextResponse.json({
                    msg: "Success",
                    code: 1
                })
            }else{
                return NextResponse.json({
                    msg: "Bal not available",
                    code: 0
                })
            }
        }else{
            return NextResponse.json({
                msg: "Not Wallet Found",
                code: 0
            })
        }
        
    }catch(error){
        return NextResponse.json({
            msg:error,
            code:0
        })
    }
}