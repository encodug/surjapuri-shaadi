'use client'
import { useAuth } from "@/app/(auth)/useAuth";
import FileDialog from "@/app/components/forms/fileDialog"
import Lightbox from "@/app/components/ui/lightbox";
import { fetchGetParamRequest } from "@/app/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react"

function Media() {
  const [images, setImages] = useState([]);
  const { user } = useAuth();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getImages = async () => {
    const { success, data } = await fetchGetParamRequest(`/api/user/media/getAll/${user.uid}`,'');
    if(success){
      setImages(data);
    }
  }

  useEffect(() => {
    getImages();
  }, [])

  return (
    <div className="rounded-md bg-slate-100 p-4">
        <div className="flex justify-between items-center mb-4">
            <h1 className="font-bold text-lg">Photos</h1>
            <FileDialog className="text-sm text-red-600 disabled:text-gray-500 disabled:cursor-not-allowed" label="Add photos" disabled={user.image_uploads_allowed > 0 ? false : true}/>
        </div>
        {images.length > 0 ? (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {images?.map((image, index) => (
                <div key={index} className="grid gap-4">
                  <div className="group"  onClick={() => {setCurrentIndex(index);setLightboxOpen(true);}}>
                    <Image src={image.photoUrl} alt={image.mediaId} width={400} height={300}  className="max-w-full h-auto rounded-xl group-hover:opacity-75"/>
                  </div>
                </div>
            ))}
          </div>
          <Lightbox images={images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isOpen={lightboxOpen} setIsOpen={setLightboxOpen}/>
          </>
        ) : (
          <div className="w-full flex flex-col items-center justify-center p-3">
            <div className="text-red-600 w-28 h-28">
              <svg viewBox="0 0 48 48">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M29.4995,12.3739c.7719-.0965,1.5437,.4824,1.5437,1.2543h0l2.5085,23.8312c.0965,.7719-.4824,1.5437-1.2543,1.5437l-23.7347,2.5085c-.7719,.0965-1.5437-.4824-1.5437-1.2543h0l-2.5085-23.7347c-.0965-.7719,.4824-1.5437,1.2543-1.5437l23.7347-2.605Z"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12.9045,18.9347c-1.7367,.193-3.0874,1.7367-2.8945,3.5699,.193,1.7367,1.7367,3.0874,3.5699,2.8945,1.7367-.193,3.0874-1.7367,2.8945-3.5699s-1.8332-3.0874-3.5699-2.8945h0Zm8.7799,5.596l-4.6312,5.6925c-.193,.193-.4824,.2894-.6754,.0965h0l-1.0613-.8683c-.193-.193-.5789-.0965-.6754,.0965l-5.0171,6.1749c-.193,.193-.193,.5789,.0965,.6754-.0965,.0965,.0965,.0965,.193,.0965l19.9719-2.1226c.2894,0,.4824-.2894,.4824-.5789,0-.0965-.0965-.193-.0965-.2894l-7.8151-9.0694c-.2894-.0965-.5789-.0965-.7719,.0965h0Z"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16.2814,13.8211l.6754-6.0784c.0965-.7719,.7719-1.3508,1.5437-1.2543l23.7347,2.5085c.7719,.0965,1.3508,.7719,1.2543,1.5437h0l-2.5085,23.7347c0,.6754-.7719,1.2543-1.5437,1.2543l-6.1749-.6754"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M32.7799,29.9337l5.3065,.5789c.2894,0,.4824-.193,.5789-.4824,0-.0965,0-.193-.0965-.2894l-5.789-10.5166c-.0965-.193-.4824-.2894-.6754-.193h0l-.3859,.3859"/>
              </svg>
            </div>
            <p className="font-semibold">Image Gallery is empty</p>
          </div>
        )}
    </div>
  )
}

export default Media