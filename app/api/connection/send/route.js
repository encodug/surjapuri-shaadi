import { query } from "@/app/lib/db";
import { db } from "@/app/lib/firebase";
import { addDoc, collection } from 'firebase/firestore';
import { NextResponse } from "next/server";

export async function POST(request) {
    const values = await request.json();

    try{
        const chatCollection = collection(db, "chatroom");

        const docRef = await addDoc(chatCollection, {
            messages: []
        });

        const firestoreDocId = docRef.id;

        const connectionQuery = "INSERT INTO connections (connectionId, uid_1, uid_2) VALUES (?, ?, ?)";
        const sent = await query(connectionQuery, [firestoreDocId, values.uid_1, values.uid_2]);
        return NextResponse.json({sent});
    } catch(error) {
        console.error(error);
        return NextResponse.json(error, {
            status: 400,
        });
    }
     
}