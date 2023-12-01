import connectDB from "@/app/db/config";
import getTokenData from "@/app/lib/getTokenData";
import groupsChat from "@/app/models/groups/groupsChat";
import groupsModels from "@/app/models/groups/groupsModels";
import messageLists from "@/app/models/message/message";
import messageChat from "@/app/models/message/messageChat";
import walletTransactions from "@/app/models/wallet/walletTransactions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { itemId, itemType, amount } = body;
        if (!body) {
            return NextResponse.json({
                msg: "Bad Request",
                code: 0
            })
        }
        const token = new getTokenData(req);
        const uId = token.userID();
        if (!token && !uId) {
            return NextResponse.json({
                msg: "Not logged In",
                code: 0
            })
        }
        //GET THE ITEM OWNER ID
        let receiverId = '';
        if (itemType === 'local-group') {
            const itemData = await groupsModels.findById({ _id: itemId })
            receiverId = itemData.groupCreatorId
        }
        if (itemType === 'message') {
            const itemData = await messageLists.findById({ _id: itemId })
            if (itemData.firstUser !== uId){
                receiverId = itemData.firstUser
            } 
            if (itemData.secondUser !== uId) {
                receiverId = itemData.secondUser
            }
        }

        //console.log(receiverId)

        //CHECKING THE AMOUNT
        const lastData = await walletTransactions.findOne({ userId: uId }).sort({ slId: -1 });
        if (lastData) {
            if (lastData.currentBal >= amount) {
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
                try{
                    const lastData2 = await walletTransactions.findOne({ userId: receiverId }).sort({ slId: -1 });
                    if (lastData2.currentBal >= amount) {
                        if (lastData2) {
                            //INSERT TO SENDER TRANSACTION
                            await walletTransactions.create({
                                userId: receiverId,
                                slId: lastData2.slId + 1,
                                transactionType: "Received",
                                prevAmount: lastData2.currentBal,
                                myPrevSlId: lastData2.slId,
                                Amount: parseFloat(amount),
                                currentBal: parseFloat(lastData2.currentBal) + parseFloat(amount),
                                status: 'Success',
                                createdDate: Date.now()
                            })
                        }
                    }
                }catch(error){
                    console.log(error)
                }
                //ADD TO THE GROUP COMMENT
                if(itemType==='local-group'){
                    const content = "Rs." + amount + "/- Contributed to the Group."
                    const createPost = await groupsChat.create({
                        groupId: itemId,
                        senderId: uId,
                        chatContent: content,
                        createdDate: Date.now()
                        // Add other properties like images, videos, files if needed
                    });
                }
                if (itemType === 'message') {
                    const content = "Rs." + amount + "/- Contributed to you."
                    const createMsg = await messageChat.create({
                        messageId: itemId,
                        userId: uId,
                        content: content,
                        createdDate: Date.now()
                    });
                }

                return NextResponse.json({
                    msg: "Success",
                    code: 1
                })
            } else {
                return NextResponse.json({
                    msg: "Bal not available",
                    code: 0
                })
            }
        } else {
            return NextResponse.json({
                msg: "Not Wallet Found",
                code: 0
            })
        }

    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
}