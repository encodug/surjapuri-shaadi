import Image from "next/image";
import BlurredImage from "./blurredImage";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(auth)/useAuth";
import { fetchGetParamRequest } from "@/app/lib/utils";
import Lightbox from "../ui/lightbox";

function GalleryImage({profile, images, masonry=false}) {
    const { user } = useAuth();
    const [connection, setConnection] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

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
            <>
                {images.map((image,index) => (
                    <Image src={image.photoUrl} alt={image.mediaId} width={400} height={300}  className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'max-w-full h-full group-hover:opacity-75'}`} onClick={() => {setCurrentIndex(index);setLightboxOpen(true);}}/>                              
                ))}
                <Lightbox images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isOpen={lightboxOpen} setIsOpen={setLightboxOpen}/>
            </>
        );
      case 'Accepted Connections':
        if(connection.length > 0) {
            if(connection.status === 'accepted') {
                return (
                    <>
                        {images.map((image,index) => (
                            <Image src={image.photoUrl} alt={image.mediaId} width={400} height={300}  className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'max-w-full h-full group-hover:opacity-75'}`} onClick={() => {setCurrentIndex(index);setLightboxOpen(true);}}/>                              
                        ))}
                        <Lightbox images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isOpen={lightboxOpen} setIsOpen={setLightboxOpen}/>
                    </>
                );
            } else {
                return images.map((image,index) => (
                    <BlurredImage src={image.photoUrl} alt={index} className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'w-full h-full group-hover:opacity-75'}`}/>    
                ));
            }
        }  else {
            return images.map((image,index) => (
                <BlurredImage src={image.photoUrl} alt={index} className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'w-full h-full group-hover:opacity-75'}`}/>    
            ));
        }
        case 'Accepted & Invited':
        if(connection.length > 0) {
            if(connection[0].status === 'accepted' || connection[0].status === 'pending') {
                return (
                    <>
                        {images.map((image,index) => (
                            <Image src={image.photoUrl} alt={image.mediaId} width={400} height={300}  className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'max-w-full h-full group-hover:opacity-75'}`} onClick={() => {setCurrentIndex(index);setLightboxOpen(true);}}/>                              
                        ))}
                        <Lightbox images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isOpen={lightboxOpen} setIsOpen={setLightboxOpen}/>
                    </>
                );
            } else {
                return images.map((image,index) => (
                    <BlurredImage src={image.photoUrl} alt={index} className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'w-full h-full group-hover:opacity-75'}`}/>    
                ));
            }
        }  else {
            return images.map((image,index) => (
                <BlurredImage src={image.photoUrl} alt={index} className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'w-full h-full group-hover:opacity-75'}`}/>    
            ));
        }
      default:
        // Use the same component for other cases (e.g., 'Accepted Connections', 'Accepted & Invited')
        return (
            <>
                {images.map((image,index) => (
                    <Image src={image.photoUrl} alt={image.mediaId} width={400} height={300}  className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'max-w-full h-full group-hover:opacity-75'}`} onClick={() => {setCurrentIndex(index);setLightboxOpen(true);}}/>                              
                ))}
                <Lightbox images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isOpen={lightboxOpen} setIsOpen={setLightboxOpen}/>
            </>
        );
    }
  } else {
    // Use the same component for the blurred image
    return images.map((image,index) => (
        <BlurredImage src={image.photoUrl} alt={index} className={`${masonry ? 'max-w-full h-auto rounded-xl group-hover:opacity-75' : 'w-full h-full group-hover:opacity-75'}`}/>    
    ));
  }
}

export default GalleryImage;
