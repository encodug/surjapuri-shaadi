import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET(request, {params}){
    try {
        const mobileNumber = params.mobile;
        const findUserQuery = 'SELECT * FROM users WHERE mobileNumber = ?';
        const user = await query(findUserQuery, mobileNumber);

        if(user.length < 1 || !user ) {
            return NextResponse.json(null);
        } else {
            return NextResponse.json({ user });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json('Error finding user', {
            status: 500,
        });
    }
}