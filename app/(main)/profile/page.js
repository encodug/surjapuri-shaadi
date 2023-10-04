'use client'
import { useAuth } from '@/app/(auth)/useAuth'
import withAuth from '@/app/(auth)/withAuth'
import FileDialog from '@/app/components/forms/fileDialog'
import SelectField from '@/app/components/forms/select'
import TextInput from '@/app/components/forms/text-input'
import Lightbox from '@/app/components/ui/lightbox'
import Spinner from '@/app/components/ui/spinner'
import { fetchGetParamRequest } from '@/app/lib/utils'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const [latestImages, setLatestImages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getLatestImages = async () => {
    const { success, data, error } = await fetchGetParamRequest(`/api/user/media/getLatest/${user.uid}`,'');
    if(success){
      setLatestImages(data);
    }
  }

  useEffect(() => {
    getLatestImages();
  }, []);

  return (
    <section className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
      {/* SideBar to SHoe User Photos and Connections */}
      <div className="flex-1 space-y-5">
        <div className='border rounded-lg shadow'>
          <div className='p-4'>
            <div className="flex justify-between items-center mb-4">
              <h3 className='font-bold text-xl'>Photos</h3>
              <Link href="/profile/media">
                <div className='text-red-600 hover:text-red-500 text-sm'>See all Photos</div>
              </Link>
            </div>
            {latestImages.length > 1 ? (
                  <>
                      <div className="grid grid-cols-3 grid-rows-3 gap-1 h-96 rounded-lg overflow-hidden">
                          {latestImages?.map((image, index) => (
                            <div key={index} className="overflow-hidden group cursor-pointer" onClick={() => {setCurrentIndex(index);setLightboxOpen(true);}}>
                              <Image src={image.photoUrl} alt={image.mediaId} width={400} height={300}  className="max-w-full h-full group-hover:opacity-75"/>                              
                            </div>
                          ))}
                      </div>
                      <Lightbox images={latestImages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isOpen={lightboxOpen} setIsOpen={setLightboxOpen}/>
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
                  )
            }
            <FileDialog uid={user.uid} className="bg-red-600 hover:bg-red-500 w-full p-2 text-slate-100 font-bold rounded-lg disabled:bg-gray-400" label="Upload Photos" disabled={user.image_uploads_allowed > 0 ? false : true}/>
          </div>
        </div>
        <div id="quick-search" className='border bg-gray-700 text-white rounded-lg shadow p-4'>
            <h3 className='font-bold text-xl mb-2'>Quick Search</h3>
            <Formik
              initialValues={{fromAge: '', toAge: '', religion: '', motherongue: ''}}
              onSubmit={(values, {setSubmitting}) => {
                router.push(`/search?${Object.entries(values).map(([key, value]) => `${key}=${value}`).join('&')}`);
                setSubmitting(false);
              }}
            >
              {({isSubmitting, setSubmitting}) => (
                <Form>
                    <div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-1 gap-x-3'>
                      <TextInput name="fromAge" label="From Age" darkMode/>
                      <TextInput name="toAge" label="To Age" darkMode/>
                      <SelectField name="religion" label="Religion" options={['Islam', 'Hindu', 'Catholic']} darkMode/>
                      <SelectField name="motherTongue" label="Mother Tongue" options={['Surjapuri', 'Bengali', 'Hindi', 'English', 'Bihari']} darkMode/>
                    </div>
                    <button type="submit" onClick={()=> setSubmitting(true)} className='bg-red-600 hover:red-500 p-2 rounded-lg text-white font-bold w-full my-2'>
                      {isSubmitting && 
                        <Spinner className="w-4 h-4"/>
                      }
                      Search
                    </button>
                </Form>
              )}
            </Formik>
        </div>
      </div>
      {/* Main Profile Display */}
      <div className="xl:col-span-2 space-y-5">

        <div className="border shadow rounded-lg overflow-hidden">
          <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
              Personal Information
              <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
          </div>
          <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
              <li className='flex justify-between items-center'>
                <p>Date of Birth :</p>
                <p className='font-semibold'>{new Date(user?.DOB).toLocaleDateString("en-IN")}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Gender :</p>
                <p className='font-semibold'>{user?.gender}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>City/ Town / Village :</p>
                <p className='font-semibold'>{user.userProfile?.location}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>District :</p>
                <p className='font-semibold'>{user.userProfile?.district}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>State :</p>
                <p className='font-semibold'>{user.userProfile?.state}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Mother Tounge :</p>
                <p className='font-semibold'>{user.userProfile?.motherTongue}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Other Languages :</p>
                <p className='font-semibold'>{user.userProfile?.otherLanguages?.join(', ')}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Profile Create By :</p>
                <p className='font-semibold'>{user.userProfile?.createdBy}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Marital Status :</p>
                <p className='font-semibold'>{user.userProfile?.maritalStatus}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>No. of Children :</p>
                <p className='font-semibold'>{user.userProfile?.noOfChildren}</p>
              </li>
          </ul>
        </div>  

        <div className="border shadow rounded-lg overflow-hidden">
          <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
              About Me
              <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
          </div>
          <div className='p-3'>
            {user.userProfile?.about}
          </div>
        </div>  

        <div className="border shadow rounded-lg overflow-hidden">
          <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
              Physical Attributes
              <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
          </div>
          <ul className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
              <li className='flex justify-between items-center'>
                <p>Height :</p>
                <p className='font-semibold'>{user.userProfile?.height}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Weight :</p>
                <p className='font-semibold'>{user.userProfile?.weight}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Complexion :</p>
                <p className='font-semibold'>{user.userProfile?.complexion}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Physical Status :</p>
                <p className='font-semibold'>{user.userProfile?.physicalStatus}</p>
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
                <p className='font-semibold'>{user.userProfile?.religion}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Caste :</p>
                <p className='font-semibold'>{user.userProfile?.caste}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Spirituality :</p>
                <p className='font-semibold'>{user.userProfile?.spritiual}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Will to marry in other caste? :</p>
                <p className='font-semibold'>{user.userProfile?.marryOtherCaste===0 ? 'No' : 'Yes'}</p>
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
                <p className='font-semibold'>{user.userProfile?.education}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Employed In :</p>
                <p className='font-semibold'>{user.userProfile?.emplymentSector}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Profession :</p>
                <p className='font-semibold'>{user.userProfile?.profession}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Annual Income :</p>
                <p className='font-semibold'>{user.userProfile?.annualIncome}</p>
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
                <p className='font-semibold'>{user.userProfile?.familyType}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Family Status :</p>
                <p className='font-semibold'>{user.userProfile?.familyStatus}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Family Value :</p>
                <p className='font-semibold'>{user.userProfile?.familyValue}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Father's Name :</p>
                <p className='font-semibold'>{user.userProfile?.fatherName}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Father's Profession :</p>
                <p className='font-semibold'>{user.userProfile?.fatherProfession}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Mother's Name :</p>
                <p className='font-semibold'>{user.userProfile?.motherName}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Mother's Profession :</p>
                <p className='font-semibold'>{user.userProfile?.motherProfession}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>No. of Brothers :</p>
                <p className='font-semibold'>{user.userProfile?.noOfBrothers}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>No. of Sisters :</p>
                <p className='font-semibold'>{user.userProfile?.noOfSisters}</p>
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
                <p className='font-semibold'>{user.userProfile?.hobbies?.join(", ")}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Eating Habits :</p>
                <p className='font-semibold'>{user.userProfile?.diet}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Smoking :</p>
                <p className='font-semibold'>{user.userProfile?.smoking}</p>
              </li>
              <li className='flex justify-between items-center'>
                <p>Drinking :</p>
                <p className='font-semibold'>{user.userProfile?.drinking}</p>
              </li>
          </ul>
        </div>  


      </div>
    </section>
  )
}

export default withAuth(Profile);