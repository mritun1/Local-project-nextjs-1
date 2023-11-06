import { NextResponse } from "next/server";

export function GET(req: Request) {
    try {

        const id = req.url.split("events/")[1];

        return NextResponse.json({
            msg: id,
            code: 1
        })

    } catch (err) {
        return NextResponse.json({
            msg: err,
            code: 0
        })
    }
}