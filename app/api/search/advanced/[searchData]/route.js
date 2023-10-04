import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
      const searchData = JSON.parse(params.searchData);
      const { gender, maritalStatus, physicalStatus, religion, caste, motherTongue ,location, district, state, education, employmentSector, annualIncome, page } = searchData;

      // Define the number of profiles to load per page
        const profilesPerPage = 12;

        // Calculate the offset based on the page number
        const offset = (page - 1) * profilesPerPage;

      // Check if fromAge and toAge are provided, otherwise set default values
        let fromAge = searchData.fromAge || 18;
        let toAge = searchData.toAge || 40;
  
      // Initialize the SQL query and parameters
      let fetchProfiles = 'SELECT users.*, userProfile.* FROM users JOIN userProfile ON users.uid = userProfile.uid WHERE users.gender = ? AND TIMESTAMPDIFF(YEAR, users.DOB, CURDATE()) BETWEEN ? AND ?';
      const queryParams = [gender, fromAge, toAge];

     // Check if religion and motherTongue are provided and add them to the query if they are
      if (religion !== null && religion !== '') {
        fetchProfiles += ' AND userProfile.religion = ?';
        queryParams.push(religion);
      }

      if (caste !== null && caste !== '') {
        fetchProfiles += ' AND userProfile.caste = ?';
        queryParams.push(caste);
      }

      if (motherTongue !== null && motherTongue !== '') {
        fetchProfiles += ' AND userProfile.motherTongue = ?';
        queryParams.push(motherTongue);
      }

      if (maritalStatus !== null && maritalStatus !== '') {
        fetchProfiles += ' AND userProfile.maritalStatus = ?';
        queryParams.push(maritalStatus);
      }

      if (physicalStatus !== null && physicalStatus !== '') {
        fetchProfiles += ' AND userProfile.physicalStatus = ?';
        queryParams.push(physicalStatus);
      }

      if (location !== null && location !== '') {
        fetchProfiles += ' AND userProfile.location = ?';
        queryParams.push(location);
      }

      if (district !== null && district !== '') {
        fetchProfiles += ' AND userProfile.district = ?';
        queryParams.push(district);
      }

      if (state !== null && state !== '') {
        fetchProfiles += ' AND userProfile.state = ?';
        queryParams.push(state);
      }

      if (education !== null && education !== '') {
        fetchProfiles += ' AND userProfile.education = ?';
        queryParams.push(education);
      }

      if (employmentSector !== null && employmentSector !== '') {
        fetchProfiles += ' AND userProfile.employmentSector = ?';
        queryParams.push(employmentSector);
      }

      if (annualIncome !== null && annualIncome !== '') {
        fetchProfiles += ' AND userProfile.annualIncome = ?';
        queryParams.push(annualIncome);
      }


      fetchProfiles += ' LIMIT ? OFFSET ?';
      queryParams.push(profilesPerPage, offset);
  
      const profiles = await query(fetchProfiles, queryParams);
  
      if (profiles.length < 1 || !profiles) {
        return NextResponse.json('No Profiles Found!', { status: 400 });
      }
  
      return NextResponse.json({ profiles });
    } catch (error) {
      console.error(error);
      return NextResponse.json('Error finding user', {
        status: 500,
      });
    }
  }
  