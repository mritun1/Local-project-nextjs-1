import getTokenData from '@/app/lib/getTokenData';
import User from '@/app/models/userModels';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try{
        const getData = new getTokenData(req)
        const uId = getData.userID();
        if (!getData && !uId ){
            return NextResponse.json({
                msg: "Sorry, not Logged In",
                code: 0
            })
        }

        const getDB = await User.findOne({ _id: getData.userID() })
        if (!getDB){
            return NextResponse.json({
                msg: "Sorry, no content",
                code: 0
            })
        }

        return NextResponse.json({
            user_id: getData.userID(),
            firstName: getDB.firstName,
            lastName: getDB.lastName,
            mobile: getDB.mobile,
            pinCode: getDB.pinCode,
            gender: getDB.gender,
            profession: getDB.profession,
            profilePic: getDB.profilePic,
            contacts: getDB.contacts,
            contactPermission: getDB.contactPermission,
        });
    }catch(err){
        return NextResponse.json({
            msg:err,
            code:0
        })
    }
};
