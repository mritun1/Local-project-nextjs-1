import { NextResponse } from "next/server";
import { MongoClient } from 'mongodb';


export async function GET(){
    const conn: any = process.env.MONGODB_URI
    const client = new MongoClient(conn);

    try {
        await client.connect();
        const db = client.db();

        const data = await db.collection('draftnewsposts').aggregate([
            {
                $unionWith: {
                    coll: 'drafteventsposts',
                },
            },
            {
                $sort: {
                    createdDate: -1, // 1 for ascending order, -1 for descending order
                },
            },
        ]).toArray();

        return NextResponse.json({
            data: data,
            msg: "Lists of Data",
            code: 1
        });
    } finally {
        client.close();
    }
}