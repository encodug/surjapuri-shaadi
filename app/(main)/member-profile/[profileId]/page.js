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
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [shortlistDialog, setShortlistDialog] = useState(false);
  const [latestImages, setLatestImages] = useState([]);
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

  const getLatestImages = async () => {
    const { success, data, error } = await fetchGetParamRequest(`/api/user/media/getLatest/${profileId}`,'');
    if(success){
      setLatestImages(data);
    }
  }

  useEffect(() => {
    fetchProfileInfo();
    getLatestImages();
  }, [profileId]);


  const sendConnection = async () => {
    const {success, data} = await sendPostRequest('/api/connection/send', {uid_1: user.uid, uid_2: profileId});
    if(success) {
      const { sent } = data;
      if(sent.affectedRows > 0) {
          setSuccessDialogOpen(true);
      }
    } else {
      
    }
  }
  

  const shortlistUser = async () => {
    const {success, data} = await sendPostRequest('/api/connection/shortlist', {uid_1: user.uid, uid_2: profileId});
    if(success) {
      const { shortlist } = data;
      if(shortlist.affectedRows > 0) {
          setShortlistDialog(true);
      }
    } else {
      
    }
  }
  

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
                <ProfileImage profile={profileInfo} />
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
            <div className="w-full rounded-lg border-2 overflow-hidden p-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className='font-bold text-xl'>Photos</h3>
                  <Link href={`/member-profile/${profileId}/media`}>
                    <div className='text-red-600 hover:text-red-500 text-sm'>See all Photos</div>
                  </Link>
                </div>
                {latestImages.length > 1 ? (
                      <div className="grid grid-cols-3 grid-rows-3 gap-1 h-96 rounded-lg overflow-hidden">
                          <GalleryImage profile={profileInfo} images={latestImages} />
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
                  )
              }
            </div>
        </div>

        <div className="flex-1 lg:basis-8/12 xl:basis-6/12 flex flex-col space-y-4">

            <div className="border shadow rounded-lg overflow-hidden">
                <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                  Personal Information
                  <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                </div>
                <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                      <li className='flex justify-between items-center'>
                        <p>Date of Birth :</p>
                        <p className='font-semibold'>{new Date(profileInfo?.DOB).toLocaleDateString("en-IN")}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>Gender :</p>
                        <p className='font-semibold'>{profileInfo?.gender}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>City/ Town / Village :</p>
                        <p className='font-semibold'>{profileInfo?.location}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>District :</p>
                        <p className='font-semibold'>{profileInfo?.district}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>State :</p>
                        <p className='font-semibold'>{profileInfo?.state}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>Mother Tounge :</p>
                        <p className='font-semibold'>{profileInfo?.motherTongue}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>Other Languages :</p>
                        <p className='font-semibold'>{profileInfo?.otherLanguages?.join(', ')}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>Profile Create By :</p>
                        <p className='font-semibold'>{profileInfo?.createdBy}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>Marital Status :</p>
                        <p className='font-semibold'>{profileInfo?.maritalStatus}</p>
                      </li>
                      <li className='flex justify-between items-center'>
                        <p>No. of Children :</p>
                        <p className='font-semibold'>{profileInfo?.noOfChildren}</p>
                      </li>
                  </ul>
            </div>

            <div className="border shadow rounded-lg overflow-hidden">
              <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                  Physical Attributes
                  <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
              </div>
              <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <li className='flex justify-between items-center'>
                    <p>Height :</p>
                    <p className='font-semibold'>{profileInfo?.height}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Weight :</p>
                    <p className='font-semibold'>{profileInfo?.weight}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Complexion :</p>
                    <p className='font-semibold'>{profileInfo?.complexion}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Physical Status :</p>
                    <p className='font-semibold'>{profileInfo?.physicalStatus}</p>
                  </li>
              </ul>
            </div>  

            <div className="border shadow rounded-lg overflow-hidden">
                <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                    Regional Information
                    <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                </div>
                <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                    <li className='flex justify-between items-center'>
                      <p>Religion :</p>
                      <p className='font-semibold'>{profileInfo?.religion}</p>
                    </li>
                    <li className='flex justify-between items-center'>
                      <p>Caste :</p>
                      <p className='font-semibold'>{profileInfo?.caste}</p>
                    </li>
                    <li className='flex justify-between items-center'>
                      <p>Spirituality :</p>
                      <p className='font-semibold'>{profileInfo?.spritiual}</p>
                    </li>
                    <li className='flex justify-between items-center'>
                      <p>Will to marry in other caste? :</p>
                      <p className='font-semibold'>{profileInfo?.marryOtherCaste===0 ? 'No' : 'Yes'}</p>
                    </li>
                </ul>
            </div>  

            <div className="border shadow rounded-lg overflow-hidden">
              <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                  Education / Profession Information
                  <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
              </div>
              <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <li className='flex justify-between items-center'>
                    <p>Education :</p>
                    <p className='font-semibold'>{profileInfo?.education}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Employed In :</p>
                    <p className='font-semibold'>{profileInfo?.emplymentSector}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Profession :</p>
                    <p className='font-semibold'>{profileInfo?.profession}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Annual Income :</p>
                    <p className='font-semibold'>{profileInfo?.annualIncome}</p>
                  </li>
              </ul>
            </div>  

            <div className="border shadow rounded-lg overflow-hidden">
              <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                  Family Details
                  <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
              </div>
              <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <li className='flex justify-between items-center'>
                    <p>Family Type :</p>
                    <p className='font-semibold'>{profileInfo?.familyType}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Family Status :</p>
                    <p className='font-semibold'>{profileInfo?.familyStatus}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Family Value :</p>
                    <p className='font-semibold'>{profileInfo?.familyValue}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Father's Name :</p>
                    <p className='font-semibold'>{profileInfo?.fatherName}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Father's Profession :</p>
                    <p className='font-semibold'>{profileInfo?.fatherProfession}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Mother's Name :</p>
                    <p className='font-semibold'>{profileInfo?.motherName}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Mother's Profession :</p>
                    <p className='font-semibold'>{profileInfo?.motherProfession}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>No. of Brothers :</p>
                    <p className='font-semibold'>{profileInfo?.noOfBrothers}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>No. of Sisters :</p>
                    <p className='font-semibold'>{profileInfo?.noOfSisters}</p>
                  </li>
              </ul>
            </div>  

            <div className="border shadow rounded-lg overflow-hidden">
              <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                  Habits And Hobbies
                  <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
              </div>
              <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                  <li className='flex justify-between items-center'>
                    <p>Hobbies :</p>
                    <p className='font-semibold'>{profileInfo?.hobbies?.join(", ")}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Eating Habits :</p>
                    <p className='font-semibold'>{profileInfo?.diet}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Smoking :</p>
                    <p className='font-semibold'>{profileInfo?.smoking}</p>
                  </li>
                  <li className='flex justify-between items-center'>
                    <p>Drinking :</p>
                    <p className='font-semibold'>{profileInfo?.drinking}</p>
                  </li>
              </ul>
            </div>  
            
        </div>

        <div className="flex-1 lg:hidden xl:basis-3/12 xl:block">
          <div className="rounded-lg border p-2 w-full">
            <p className="text-2xl font-bond">Advertise Here</p>
          </div>
        </div>
      </div>
    </div>

    <SurjapuriDialog isOpen={successDialogOpen} setIsOpen={setSuccessDialogOpen}>
      <>
        <Player src="/lottie/sent-mail.json" background="transparent" speed={1} style={{ height: '300px', width: '300px' }} loop autoplay></Player>
        <h3 className="text-2xl text-center mb-4 font-bold">Congratulations! 🎉</h3>
        <p>You've just launched the love missile! 🚀💘. Now, sit back, relax, and prepare for a love response. Remember, love isn't instant noodles; it takes a bit of time to cook up something special. 🍝💖</p>
      </>
    </SurjapuriDialog>

    <SurjapuriDialog isOpen={shortlistDialog} setIsOpen={setShortlistDialog}>
      <>
        <Player src="/lottie/sent-mail.json" background="transparent" speed={1} style={{ height: '300px', width: '300px' }} loop autoplay></Player>
        <h3 className="text-2xl text-center mb-4 font-bold">Congratulations! 🎉</h3>
        <p>You've just added a dash of intrigue to your love story recipe! 🌟💘 Your potential match is now safely tucked away.Think of it as marinating your favorite dish before cooking it to perfection. 🍽️🔥</p>
      </>
    </SurjapuriDialog>
    </>
  )
}

export default ViewProfile