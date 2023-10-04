import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {

    const values = await request.json();
    const {uid, update} = values;
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try{
        const updateQuery = `UPDATE users SET ${Object.keys(update).map((key) => `${key} = ?` ).join(", ")} WHERE uid = ?`;
        const updated  = await query(updateQuery, [...Object.values(update), uid]);
        return NextResponse.json({updated});
    } catch(error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 400,
        });
    }
     
}