import { NextApiRequest, NextApiResponse } from 'next';
import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { writeFile } from 'fs';

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.formData()
        const filSelected: File | null = body.get("file") as unknown as File
        console.log(filSelected)
        if (!filSelected){
            return NextResponse.json({
                msg: body
            })
        }

        const bytes = await filSelected.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join("uploaded/",filSelected.name)
        await writeFile(path, buffer, 'utf8', (err) => {
            if (err) {
                console.error(err);
                // Handle the error here
            } else {
                // File was successfully written
                console.log("success")
            }
        });

        return NextResponse.json({
            msg: "success"
        })

        
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            msg: error
        })
    }
}
