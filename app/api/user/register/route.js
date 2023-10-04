import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const values = await request.json();
    
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try{
        const insertQuery = "INSERT INTO users (uid, name, email, mobileNumber, gender, DOB) VALUES (?, ?, ?, ?, ?, ?)";
        const user = await query(insertQuery, [values.uid, values.name, values.email, values.mobile, values.gender, values.DOB]);
        return NextResponse.json({user});
    } catch(error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 400,
        });
    }
     
}