'use client'
import { useAuth } from "@/app/(auth)/useAuth";
import GalleryImage from "@/app/components/profile/GalleryImage";
import ProfileImage from "@/app/components/profile/ProfileImage";
import BlurredImage from "@/app/components/profile/blurredImage";
import SurjapuriDialog from "@/app/components/ui/dialog";
import { calculateAge, fetchGetParamRequest, sendPostRequest } from "@/app/lib/utils";
import { BookmarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}


function ViewProfile({params}) {
  const profileId = params.profileId;
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);
  const [images, setImages] = useState([]);
  const { user } = useAuth();

  const fetchProfileInfo = async () => {
    
    const { success, data } = await fetchGetParamRequest('/api/search/profile/', profileId);
    if(success) {
      setProfileInfo(data.profile[0]);
      setLoading(false);
    } else {
      setProfileInfo(null);
      setLoading(false);
    }
  }

  const getImages = async () => {
    const { success, data } = await fetchGetParamRequest(`/api/user/media/getAll/${profileId}`,'');
    if(success){
      setImages(data);
    }
  }

  useEffect(() => {
    fetchProfileInfo();
    getImages();
  }, [profileId]);

  if(loading) {
    return (
      <div className="container mx-auto p-6 md:py-8">
        Skeleton
      </div>
    )
  }

  return (
    <>
    <div className="container mx-auto p-6 md:py-8">
      <p>Back to Search</p>
      <div className="flex flex-col lg:flex-row lg:space-x-4 lg:space-y-0 space-y-4 overflow-hidden">

        <div className="flex-1 lg:basis-4/12 xl:basis-3/12">
            <div className="w-full rounded-lg border-2 overflow-hidden">
              <div className="w-full h-96 relative">
                <ProfileImage profile={profileInfo}/>
              </div>
              <div className="bg-white p-4">
                <div className="flex justify-between">
                    <p className="text-lg font-semibold">{profileInfo.name}</p>
                    <p className="ml-2">
                      {calculateAge(new Date(profileInfo.DOB))}, {profileInfo.gender}
                    </p>
                </div>
                <p className="my-4">{profileInfo.about}</p>
                <div className="flex flex-row space-x-2">
                  <button type="button" className={`rounded-lg p-2 font-semibold flex items-center space-x-2 ${(isToday(new Date(user.subscription_end_date)) || user.connections_allowed <= 0) ? 'bg-slate-200 text-red-600 cursor-not-allowed' : 'bg-red-600 text-slate-100 hover:bg-slate-200 hover:text-red-600 cursor-pointer'}`} onClick={() => sendConnection()}   disabled={isToday(new Date(user.subscription_end_date)) || user.connections_allowed <= 0}>
                    <CheckCircleIcon className="w-5 h-5"/>
                    <span>Show Interest</span>
                  </button>
                  <button type="button" className="rounded-lg border border-red-600 p-2 text-red-600 font-semibold flex items-center space-x-2 cursor-pointer hover:bg-red-500 hover:text-white hover:border-transparent" onClick={() => shortlistUser()}>
                    <BookmarkIcon className="w-5 h-5"/>
                    <span>Shortlist</span>
                  </button>
                </div>
              </div>
            </div>
        </div>

        <div className="flex-1 lg:basis-8/12 xl:basis-6/12 flex flex-col space-y-4">
            
        {images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <GalleryImage profile={profileInfo} images={images} masonry/>
        </div>
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

        <div className="flex-1 lg:hidden xl:basis-3/12 xl:block">
          <div className="rounded-lg border p-2 w-full">
            <p className="text-2xl font-bond">Advertise Here</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ViewProfile