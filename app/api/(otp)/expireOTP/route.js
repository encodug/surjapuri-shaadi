import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { mobile } = await request.json();
    
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try{
        
    const updateQuery = "UPDATE otp_verification SET is_expired = 1 WHERE mobile_number = ? AND is_verified = 0 AND is_expired = 0 ORDER BY `timestamp`  DESC LIMIT 1";
    const update = await query(updateQuery, mobile);

    return NextResponse.json({update});
    } catch(error) {
        console.error(error);
        return NextResponse.json('Error updating OTP Status', {
            status: 500,
        });
    }
     
}