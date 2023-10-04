import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
      const profileId = params.profileId;
  
      // Initialize the SQL query and parameters
      const profileQuery = 'SELECT users.*, userProfile.* FROM users JOIN userProfile ON users.uid = userProfile.uid WHERE users.uid= ?';
      const profile = await query(profileQuery, [profileId]);
  
      if (profile.length < 1 || !profile) {
        return NextResponse.json('No Profiles Found!', { status: 400 });
      }
  
      return NextResponse.json({ profile });
    } catch (error) {
      console.error(error);
      return NextResponse.json('Error finding user', {
        status: 500,
      });
    }
  }
  