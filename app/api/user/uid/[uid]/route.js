import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET(request, {params}){
    try {
        const uid = params.uid;
        const findUserQuery = 'SELECT * FROM users WHERE uid = ? LIMIT 1';
        const findUserProfileQuery = 'SELECT * FROM userProfile WHERE uid = ? LIMIT 1';
        const findUserSubscriptionsQuery = 'SELECT MAX(end_date) as end_date FROM user_subscriptions WHERE uid = ? LIMIT 1';

        const [userData, userProfile, subscription_end_date] = await Promise.all([ 
            await query(findUserQuery, uid),
            await query(findUserProfileQuery, uid),
            await query(findUserSubscriptionsQuery, uid),
        ]);

        if(userData.length < 1 || !userData[0]) {
            return NextResponse.json('User not Found!', { status: 400});
        } 

        const user = userData[0];
    
        const userProfileColumnNames = ['createdBy', 'motherTongue', 'otherLanguages', 'physicalStatus', 'employmentSector', 'profession', 'education' ,'location', 'district', 'state', 'height', 'weight', 'complexion', 'caste', 'annualIncome', 'religion', 'spritiual', 'maritalStatus', 'marryOtherCaste', 'noOfChildren', 'hobbies', 'diet', 'smoking', 'drinking', 'familyType', 'familyStatus', 'familyValues', 'fatherName', 'fatherProfession', 'motherName', 'motherProfession', 'noOfBrothers', 'noOfSisters', 'nativePlace', 'about'];

        // Initialize userProfileData object with column names
        const userProfileData = {};
        for (const columnName of userProfileColumnNames) {
          userProfileData[columnName] = userProfile.length > 0 ? userProfile[0][columnName] : null;
        }

        const combinedData = {
            ...user,
            userProfile: userProfileData,
            subscription_end_date: subscription_end_date[0].end_date
              ? new Date(subscription_end_date[0].end_date)
              : new Date(),
          };
          

        return NextResponse.json({ user: combinedData });

    } catch (error) {
        console.error(error);
        return NextResponse.json('Error finding user', {
            status: 500,
        });
    }
}