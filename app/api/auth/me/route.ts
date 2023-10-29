import getTokenData from '@/app/lib/getTokenData';
import User from '@/app/models/userModels';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try{
        const getData = new getTokenData(req)

        const getDB = await User.findOne({ _id: getData.userID() })

        return NextResponse.json({
            user_id: getData.userID(),
            firstName: getDB.firstName,
            lastName: getDB.lastName,
            mobile: getDB.mobile,
            pinCode: getDB.pinCode,
            gender: getDB.gender,
            profession: getDB.profession
        });
    }catch(err){
        return NextResponse.json({
            msg:err,
            code:0
        })
    }
};
