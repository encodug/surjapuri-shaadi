import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET(request, {params}){
    try {
        const email = params.email;
        const findUserQuery = 'SELECT * FROM users WHERE email = ?';
        const user = await query(findUserQuery, email);

        if(user.length < 1 || !user) {
            return NextResponse.json('User not Found!');
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