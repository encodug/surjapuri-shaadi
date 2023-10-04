import { transaction } from "@/app/lib/db";
import { unlink, stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {

  const formData  = await request.formData();
  const uid = params.uid;
  let uploadedFile = '';

  const file = formData.get("photoUrl");

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



  const updateQuery = `
      INSERT INTO userProfile (
        uid,
        motherTongue,
        otherLanguages,
        profession,
        location,
        district,
        state,
        height,
        weight,
        complexion,
        physicalStatus,
        education,
        annualIncome,
        religion,
        spritiual,
        maritalStatus,
        noOfChildren,
        hobbies,
        smoking,
        drinking,
        fatherName,
        fatherProfession,
        motherName,
        motherProfession,
        noOfBrothers,
        noOfSisters,
        nativePlace,
        about
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        motherTongue = VALUES(motherTongue),
        otherLanguages = VALUES(otherLanguages),
        profession = VALUES(profession),
        location = VALUES(location),
        district = VALUES(district),
        state = VALUES(state),
        height = VALUES(height),
        weight = VALUES(weight),
        complexion = VALUES(complexion),
        physicalStatus = VALUES(physicalStatus),
        education = VALUES(education),
        annualIncome = VALUES(annualIncome),
        religion = VALUES(religion),
        spritiual = VALUES(spritiual),
        maritalStatus = VALUES(maritalStatus),
        noOfChildren = VALUES(noOfChildren),
        hobbies = VALUES(hobbies),
        smoking = VALUES(smoking),
        drinking = VALUES(drinking),
        fatherName = VALUES(fatherName),
        fatherProfession = VALUES(fatherProfession),
        motherName = VALUES(motherName),
        motherProfession = VALUES(motherProfession),
        noOfBrothers = VALUES(noOfBrothers),
        noOfSisters = VALUES(noOfSisters),
        nativePlace = VALUES(nativePlace),
        about = VALUES(about);
    `;

    const queries = [
        {
            sql: updateQuery,
            values: [
                uid, 
                formData.get('motherTongue'),
                formData.get('otherLanguages'),
                formData.get('profession'), 
                formData.get('location'), 
                formData.get('district'), 
                formData.get('state'), 
                formData.get('height'), 
                formData.get('weight'), 
                formData.get('complexion'), 
                formData.get('physicalStatus'), 
                formData.get('education'), 
                formData.get('annualIncome'), 
                formData.get('religion'),
                formData.get('spritiual'),
                formData.get('maritalStatus'),
                formData.get('noOfChildren'),
                formData.get('hobbies'),
                formData.get('smoking'), 
                formData.get('drinking'), 
                formData.get('fatherName'), 
                formData.get('fatherProfession'), 
                formData.get('motherName'),
                formData.get('motherProfession'),
                formData.get('noOfBrothers'),
                formData.get('noOfSisters'),
                formData.get('nativePlace'),
                formData.get('about'),
              ]
        },
        {
            sql: 'UPDATE users SET photoUrl = ?, profile_completed = 1 WHERE uid = ?',
            values: [uploadedFile, uid]
        },
        {
          sql: 'INSERT INTO userMedia (uid, photoUrl) VALUES (?,?)',
          values: [uid, uploadedFile]
        }
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
