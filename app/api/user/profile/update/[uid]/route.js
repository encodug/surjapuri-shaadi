import { transaction, query } from "@/app/lib/db";
import { unlink, stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {

  const values  = await request.json();
  const uid = params.uid;
  try{
    const updateQuery = `INSERT INTO userProfile (
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
        spiritual,
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
        about,
        createdBy,
        employmentSector,
        caste,
        marryOtherCaste,
        diet,
        familyType,
        familyStatus,
        familyValues
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        spiritual = VALUES(spiritual),
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
        about = VALUES(about),
        createdBy = VALUES(createdBy),
        employmentSector = VALUES(employmentSector),
        caste = VALUES(caste),
        marryOtherCaste = VALUES(marryOtherCaste),
        diet = VALUES(diet),
        familyType = VALUES(familyType),
        familyStatus = VALUES(familyStatus),
        familyValues = VALUES(familyValues);
      `;

    const queryValue = [
      uid, 
      values.motherTongue,
      values.otherLanguages,
      values.profession, 
      values.location, 
      values.district, 
      values.state, 
      values.height, 
      values.weight, 
      values.complexion, 
      values.physicalStatus, 
      values.education, 
      values.annualIncome, 
      values.religion,
      values.spritiual,
      values.maritalStatus,
      values.noOfChildren,
      values.hobbies,
      values.smoking, 
      values.drinking, 
      values.fatherName, 
      values.fatherProfession, 
      values.motherName,
      values.motherProfession,
      values.noOfBrothers,
      values.noOfSisters,
      values.nativePlace,
      values.about,
      values.createdBy,
      values.employmentSector,
      values.caste,
      values.marryOtherCaste ? 1 : 0,
      values.diet,
      values.familyType,
      values.familyStatus,
      values.familyValues,
    ];

  
    const user = await query(updateQuery, queryValue);
    return NextResponse.json({user});
    
  } catch(error) {
      console.error(error);
      return NextResponse.json(error, {
          status: 400,
      });
  }
  
}
