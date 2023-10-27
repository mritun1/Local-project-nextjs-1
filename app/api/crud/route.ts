import getTokenData from "@/app/lib/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){

    const tokenData = new getTokenData(req);

    return NextResponse.json({
        msg: tokenData.userID(),
        firstName: tokenData.firstName()
    })
}