import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET(request, {params}){
    const uid = params.uid;

    try {

        const getImagesQuery = "SELECT * FROM userMedia WHERE uid = ? ORDER BY mediaId DESC";
        const selectedImages = await query(getImagesQuery, [uid]);
        return NextResponse.json(selectedImages);

    } catch (error) {
        console.error(error);
        return NextResponse.json('Error reading image files:', {
            status: 500,
        });
    }
}