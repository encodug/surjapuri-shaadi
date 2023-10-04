import { transaction } from "@/app/lib/db";
import { unlink, stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {

  const formData  = await request.formData();
  const uid = params.uid;
  let uploadedFile = '';

  const file = formData.get("file");

  if (typeof file !== 'string') {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir =`./public/images/${uid}`;

      try {
          await stat(uploadDir);
      } catch(error) {
          if(error.code === "ENOENT") {
              await mkdir(uploadDir, { recursive : true});
          } 
      }

      try{
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const originalFilename = file.name; // Replace this with the actual filename
          const fileExtension = originalFilename.split('.').pop();
          const filename = `${uniqueSuffix}.${fileExtension}`;

          await writeFile(`${uploadDir}/${filename}`, buffer);
          uploadedFile = `/images/${uid}/${filename}`;
      } catch (e) {
          console.error("Error while trying to upload a file\n", e);
          return NextResponse.json(
              { error: "Something went wrong." },
              { status: 500 }
          );
      }
  } else { 
      uploadedFile = file;
  }


  const queries = [
    {
      sql: 'INSERT INTO userMedia (uid, photoUrl) VALUES (?,?)',
      values: [uid, uploadedFile]
    },
    {
        sql: 'UPDATE users SET image_uploads_allowed = image_uploads_allowed - 1 WHERE uid = ?',
        values: [uid]
    },
]

try {
    const result = await transaction(queries);
    if (result.success) {
        return NextResponse.json({ success: true, fileUrl: uploadedFile });
    } else {
        await unlink(`${uploadDir}/${filename}`);
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
} catch (error) {
    console.error(error);
    await unlink(`${uploadDir}/${filename}`);
    return NextResponse.json(error, {
      status: 400,
    });
  }

}
