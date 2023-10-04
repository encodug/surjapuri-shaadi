import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const values = await request.json();

    try{
        const shortlistQuery = "INSERT INTO shortlisted (uid_1, uid_2) VALUES (?, ?)";
        const shortlist = await query(shortlistQuery, [values.uid_1, values.uid_2]);
        return NextResponse.json({shortlist});
    } catch(error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 400,
        });
    }
     
}