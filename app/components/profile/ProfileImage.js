import Image from "next/image";
import BlurredImage from "./blurredImage";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(auth)/useAuth";
import { fetchGetParamRequest } from "@/app/lib/utils";

function ProfileImage({profile}) {
    const { user } = useAuth();
    const [connection, setConnection] = useState([]);
    const getConnection = async () => {
        const searchObject = { uid_1: user.uid, uid_2: profile.uid };
        const {success, data, error} = await fetchGetParamRequest('/api/connection/search/', JSON.stringify(searchObject));
        if( success ){
            setConnection(data.connections);
        } else {
            setConnection([]);
        }
    }

    useEffect(() => {
        getConnection();
    }, []);
    
  // Check if the photo is approved
  if (profile.photoApproved === 1) {
    // Check photoPrivacy to decide which image component to use
    switch (profile.photoPrivacy) {
      case 'Everyone':
        return (
            <Image src={profile.photoUrl} alt={profile.name} fill className={`object-cover object-center`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        )
      case 'Accepted Connections':
        if(connection.length > 0) {
            if(connection.status === 'accepted') {
                return(
                    <Image src={profile.photoUrl} alt={profile.name} fill className={`object-cover object-center`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                )
            } else {
                return (
                    <BlurredImage src={profile.photoUrl} alt={profile.name} className="object-cover object-center w-full h-full"/>    
                )
            }
        }  else {
            return (
                <BlurredImage src={profile.photoUrl} alt={profile.name} className="object-cover object-center w-full h-full"/>
            )
        }
        case 'Accepted & Invited':
        if(connection.length > 0) {
            if(connection[0].status === 'accepted' || connection[0].status === 'pending') {
                return(
                    <Image src={profile.photoUrl} alt={profile.name} fill className={`object-cover object-center`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                )
            } else {
                return (
                    <BlurredImage src={profile.photoUrl} alt={profile.name} className="object-cover object-center w-full h-full"/>    
                )
            }
        }  else {
            return (
                <BlurredImage src={profile.photoUrl} alt={profile.name} className="object-cover object-center w-full h-full"/>
            )
        }
      default:
        // Use the same component for other cases (e.g., 'Accepted Connections', 'Accepted & Invited')
        return (
            <Image src={profile.photoUrl} alt={profile.name} fill className={`object-cover object-center`} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        )
    }
  } else {
    // Use the same component for the blurred image
    return (
        <BlurredImage src={profile.photoUrl} alt={profile.name} className="object-cover object-center w-full h-full"/>
    )
  }
}

export default ProfileImage;
