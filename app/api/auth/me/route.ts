import getTokenData from '@/app/lib/getTokenData';
import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
    const getData = new getTokenData(req)
    return NextResponse.json({
        id: getData.userID(),
        firstName: getData.firstName(),
        lastName: getData.lastName(),
        mobile:getData.mobile(),
        pinCode: getData.pinCode()
    });
};
