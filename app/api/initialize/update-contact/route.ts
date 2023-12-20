import { NextResponse } from "next/server";
import connectDB from "@/app/db/config";
import User from "@/app/models/userModels";

// http://127.0.0.1:3000/api/initialize/update-contact

export async function GET() {
    try {
        await connectDB();

        const userLists = await User.find({ isActive: 1 })
        const data: any[] = []
        userLists.forEach(async (item, index) => {
            const mobile = item.mobile
            //INSERT INTO DATABASE
            await User.findByIdAndUpdate(item._id, {
                contacts: mobile,
                contactPermission: "Sell"
            })
        })

        const newUserLists = await User.find({ isActive: 1 })
        return NextResponse.json({
            mgs: newUserLists
        })

    } catch (error) {
        return NextResponse.json({
            mgs: error
        })
    }


}