import { query } from "@/app/lib/db";
import { createOTP } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
    
    const { mobile } = await request.json();
    const otp = createOTP();
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try {
    const insertQuery = "INSERT INTO otp_verification (mobile_number, otp) VALUES (?, ?)";
    const insert = await query(insertQuery, [mobile, otp]);

    return NextResponse.json({insert});
    } catch (error) {
        console.error(error);
        return NextResponse.json('Error on resending OTP', {
            status: 500,
        });
    }
}