import { query } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
      const searchData = JSON.parse(params.searchData);
      const { gender, religion, motherTongue, page } = searchData;

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
      if (religion) {
        fetchProfiles += ' AND userProfile.religion = ?';
        queryParams.push(religion);
      }
      
      if (motherTongue) {
        fetchProfiles += ' AND userProfile.motherTongue = ?';
        queryParams.push(motherTongue);
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
  