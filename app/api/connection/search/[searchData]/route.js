import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const searchData = JSON.parse(params.searchData);
    const {uid_1, uid_2} = searchData;
      try {
        
        let fetchConnection = 'SELECT * FROM connections WHERE (uid_1 = ? AND uid_2 = ?) OR (uid_1 = ? AND uid_2 = ?)';
        const connections = await query(fetchConnection, [uid_1, uid_2, uid_2, uid_1]);

        if (connections.length < 1 || !connections) {
          return NextResponse.json('No Connections Found!', { status: 400 });
        }
    
        return NextResponse.json({ connections });

      } catch (error) {
          console.error(error);
          return NextResponse.json('Error finding user', {
            status: 500,
          });
      }
}
    