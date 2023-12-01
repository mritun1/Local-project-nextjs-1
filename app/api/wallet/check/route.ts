import connectDB from '@/app/db/config';
import getTokenData from '@/app/lib/getTokenData';
import User from '@/app/models/userModels';
import walletTransactions from '@/app/models/wallet/walletTransactions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const getData = new getTokenData(req)
        const uID = getData.userID();
        const getDB = await User.findOne({ _id: uID })
        if (!getDB) {
            return NextResponse.json({
                msg: "Sorry, not login",
                code: 0
            })
        }

        const lastData = await walletTransactions.findOne({ userId: uID }).sort({ slId: -1 });

        return NextResponse.json({
            bal: lastData.currentBal,
            code:1
        });
    } catch (error) {
        return NextResponse.json({
            msg: error,
            code: 0
        })
    }
};
