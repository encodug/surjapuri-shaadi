import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { otp, mobile } = await request.json();
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try {
        const validateQuery = "SELECT * FROM surjapuri.otp_verification WHERE mobile_number = ? AND is_expired = 0 AND is_verified = 0 ORDER BY `timestamp`  DESC LIMIT 1";
        const getValidation = await query(validateQuery, mobile);
        const validationData = getValidation[0];

        if(!validationData) {
            return NextResponse.json({ message: 'Invalid Mobile Number.', status: 400 });
        }

        if(validationData.attempts > 5) {
         // Implement logic to disable registration for this mobile number or IP for 24 hours.
                // You can add a timestamp for when registration should be re-enabled in the database.
                // You'll need to handle this separately based on your system's architecture.   
        }
        
        if( otp == validationData.otp ) {  
            const verifiedQuery = "UPDATE otp_verification SET is_verified = 1 WHERE id = ?";
            const verified = await query(verifiedQuery, validationData.id);
            return NextResponse.json({verified});    
        } else {    
            const attemptQuery = "UPDATE otp_verification SET attempts = attempts + 1 WHERE id = ?";
            await query(attemptQuery, validationData.id);
            return NextResponse.json({message: 'Invalid OTP', status: 400});
        }

        
    } catch (error) {
        console.error(error);
        return NextResponse.json('Error on validating OTP', {
            status: 500,
        });
    }
}