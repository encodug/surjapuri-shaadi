import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {

    
    
    //Send OTP to Mobile Number ${res.mobile} Using SMS API 
    try{
        const uid = params.uid;

        const connectionQuery = "SELECT * FROM connections WHERE uid_1 = ? OR uid_2 = ?";
        const connections = await query(connectionQuery, [uid, uid]);

        if(connections.length === 0 ) {
            return NextResponse.json("No connections found for the user" , {
                status: 400
            });
        }

        const otherUserIds  = connections.map((connection) => connection.uid_1 === uid ? connection.uid_2 : connection.uid_1 );
        const placeholders = otherUserIds.map(() => "?").join(", ");
        const userQuery = `SELECT users.*, userProfile.* FROM users JOIN userProfile ON users.uid = userProfile.uid WHERE users.uid IN (${placeholders})`;


        const otherUsers = await query(userQuery, otherUserIds);

        

        const connectionWithUsers = connections.map((connection) => {
            const otherUser = otherUsers.find(
                (user) => user.uid === (connection.uid_1 === uid ? connection.uid_2 : connection.uid_1)
            )

            return {
                ...connection,
                ...otherUser,
            }
        });
        
        return NextResponse.json({connectionWithUsers});
        
    } catch(error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 400,
        });
    }
     
}