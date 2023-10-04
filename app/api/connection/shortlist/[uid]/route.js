import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {

    
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try{
        const uid = params.uid;

        const shortlistQuery = "SELECT * FROM shortlisted WHERE uid_1 = ? AND interestSent = 0";
        const shorlisted = await query(shortlistQuery, [uid]);

        if(shorlisted.length === 0 ) {
            return NextResponse.json("No connections found for the user" , {
                status: 400
            });
        }

        

        const otherUserIds  = shorlisted.map((shortlist) => shortlist.uid_2 );
        
        const placeholders = otherUserIds.map(() => "?").join(", ");
        const userQuery = `SELECT users.*, userProfile.* FROM users JOIN userProfile ON users.uid = userProfile.uid WHERE users.uid IN (${placeholders})`;


        const otherUsers = await query(userQuery, otherUserIds);


        const shortlistedWithUsers = shorlisted.map((shortlist) => {
            const otherUser = otherUsers.find(
                (user) => user.uid === shortlist.uid_2
            )

            return {
                ...shortlist,
                ...otherUser,
            }
        });
        
        return NextResponse.json({shortlistedWithUsers});
        
    } catch(error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 400,
        });
    }
     
}