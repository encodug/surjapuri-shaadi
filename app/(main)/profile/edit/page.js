'use client'
import { getUserData, useAuth, useAuthDispatch } from "@/app/(auth)/useAuth"
import withAuth from "@/app/(auth)/withAuth"
import {AutoComplete, DependentSelectField, FileInput, OtherSelectField, SelectField, TextArea, TextInput} from "@/app/components/forms";
import Spinner from "@/app/components/ui/spinner";
import { degrees, indianDistricts, indianStates, professions } from "@/app/lib/dataUtils";
import { sendPostFormBodyRequest, sendPostRequest } from "@/app/lib/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from 'yup';

const ProfileValidationSchema =  Yup.object().shape({
  location: Yup.string().required("Location is important. Even for lovebirds."),
  district: Yup.string().required("District is like your relationship status - it can't be empty."),
  state: Yup.string().required("You're within India, right? We need your state."),
  motherTongue: Yup.string().required("Your preferred language is a must-know."),
  height: Yup.string().required("Height matters in love. Please provide it."),
  weight: Yup.number().required("Weight, because love should be balanced."),
  complexion: Yup.string().required("Complexion because we want to match, not mismatch."),
  physicalStatus: Yup.string().required("Just in case you have a superpower."),
  education: Yup.string().required('To see if you’re a brainiac or a philosopher.'),
  profession: Yup.string().required('We all need to bring home the dough.'),
  annualIncome: Yup.string().required("We're not looking for a free ride."),
  religion: Yup.string().required("We don't want any religious debates on our platform."),
  about: Yup.string().required('We want to know the book, not just its cover.'),
  photoUrl: Yup.mixed().required('A photo would be great! We want to see your best angles.'),
});


function ProfileUpdation() {
  const {user} = useAuth();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const initialValues = {
    createdBy: user.userProfile?.createdBy || '',
    location: user.userProfile?.location || '',
    district: user.userProfile?.district || '',
    state: user.userProfile?.state || '',
    motherTongue: user.userProfile?.motherTongue || '',
    otherLanguages: user.userProfile?.otherLanguages?.map(language => ({
      value: language,
      label: language,
    })) || null,
    height: user.userProfile?.height || '',
    weight: user.userProfile?.weight || '',
    complexion: user.userProfile?.complexion || '',
    physicalStatus: user.userProfile?.physicalStatus || '',
    education: user.userProfile?.education || '',
    employmentSector: user.userProfile?.employmentSector || '',
    profession: user.userProfile?.profession || '',
    annualIncome: user.userProfile?.annualIncome || '',
    religion: user.userProfile?.religion || '',
    caste: user.userProfile?.caste || '',
    marryOtherCaste: user.userProfile?.marryOtherCaste || 'No',
    spiritual: user.userProfile?.spiritual || '',
    maritalStatus: user.userProfile?.maritalStatus || '',
    noOfChildren: user.userProfile?.noOfChildren || '',
    hobbies: user.userProfile?.hobbies?.map(language => ({
      value: language,
      label: language,
    })) || null,
    diet: user.userProfile?.diet || '',
    smoking: user.userProfile?.smoking || '',
    drinking: user.userProfile?.drinking || '',
    familyType:  user.userProfile?.familyType || '',
    familyStatus:  user.userProfile?.familyStatus || '',
    familyValues: user.userProfile?.familyValues || '',
    fatherName: user.userProfile?.fatherName || '',
    fatherProfession: user.userProfile?.fatherProfession || '',
    motherName: user.userProfile?.motherName || '',
    motherProfession: user.userProfile?.motherProfession || '',
    noOfBrothers: user.userProfile?.noOfBrothers || '',
    noOfSisters: user.userProfile?.noOfSisters || '',
    nativePlace: user.userProfile?.nativePlace || '',
    about: user.userProfile?.about || '',
    photoUrl : user?.photoUrl || '',
  }

  return (
    <section>
      <div className="w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileValidationSchema}
          enableReinitialize
          validateOnBlur
          onSubmit={async (values, { setSubmitting }) => {
            
            values.otherLanguages = JSON.stringify(values.otherLanguages.map(hobby => hobby.value));
            values.hobbies = JSON.stringify(values.hobbies.map(hobby => hobby.value));

            if(values.photoUrl  && typeof values.photoUrl !== 'string') {
              try{
                const { success } = await sendPostFormBodyRequest(`/api/user/profile/update/withPhoto/${user.uid}`, values);
                if(success) {
                  getUserData(user.uid, dispatch);
                  router.push('/profile');
                }
              } catch (error) {
                console.error("something went wrong, check your console.");
              }
            } else {
              try{
                const { success } = await sendPostRequest(`/api/user/profile/update/${user.uid}`, values);
                if(success) {
                  getUserData(user.uid, dispatch);
                  router.push('/profile');
                }
              } catch (error) {
                console.error("something went wrong, check your console.");
              }
            }

            setSubmitting(false);
          }}
        >
          {({values, isSubmitting, setSubmitting}) => (
            <Form className="flex flex-col space-y-5">
              <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                    <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                      Personal Information
                      <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                      <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                    </Disclosure.Button>
                    <Disclosure.Panel className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <SelectField name="createdBy" label="Profile Created By" options={['Self', 'Parents', 'Guardian', 'Friends', 'Sibling', 'Relatives']}/>
                          <TextInput name="location" type="text" label="City / Town / Village"/>
                          <DependentSelectField name="district" label="District" dependency="state" data={indianDistricts}/>
                          <SelectField name="state" label="State" options={indianStates}/>                    
                          <SelectField name="motherTongue" label="Mother Tongue" options={['Surjapuri', 'Urdu', 'Hindi', 'Bengali', 'Bihari', 'English']}/>
                          <AutoComplete name="otherLanguages" label="Other Languages" options={['Surjapruri','Urdu', 'Hindi', 'Bengali', 'Bihari', 'English' ]}/>
                          <SelectField name="maritalStatus" label="Marital Status" className="flex-1" options={['Prefer Not to Say', 'Never Married', 'Divorced', 'Widow', 'Widower' ]} />
                          <SelectField name="noOfChildren" label="Has Children" className="flex-1" options={[0, 1, 2, 3, 'More than 3', 'Prefer Not to Say']} />
                    </Disclosure.Panel>
                </Disclosure>  

                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                      <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                        Physical Attributes
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-4 grid grid-cols-1 md:grid-cols-3 gap-x-3">
                          <TextInput name="height" label="Height" type="text"/>
                          <TextInput name="weight" label="Weight" type="text"/>
                          <SelectField name="complexion" label="Complexion" options={['Very Fair', 'Fair', 'Wheatish', 'Dusky', 'Dark']}/>
                          <SelectField name="physicalStatus" label="Physical Status" options={['Normal', 'Physically Challenged']}/>
                      </Disclosure.Panel>
                </Disclosure>  

                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                      <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                        Education / Profession Information
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-3">
                      <SelectField name="education" label="Education" options={degrees} />
                        <SelectField name="employmentSector" label="Employeed In" options={['Private', 'Government', 'Business', 'Defence', 'Self Employed', 'Not Working']}/>
                        <OtherSelectField name="profession" label="Profession" options={professions} disabled={ values.employmentSector === 'Business' || values.employmentSector === 'Self Employed' || values.employmentSector === 'Not Working'}/>
                        <SelectField name="annualIncome" label="Annual Income" options={['1,00,000 - 2,00,000', '2,00,000 - 5,00,000', '5,00,000 - 10,00,000', '10,00,000 - 15,00,000', '15,00,000 - 20,00,000', 'Above 20,00,000' ]}/>
                      </Disclosure.Panel>
                </Disclosure>  

                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                      <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                        Regional Information
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <SelectField name="religion" label="Religion" options={['Prefer Not to Say','Islam', 'Hindu', 'Christian']} />
                          <DependentSelectField name="caste" label="Caste" dependency="religion" data={{'Prefer Not to Say': [], 'Islam': ['Barelvi', 'Deobandi', 'Ahl-e-Hadees'], 'Hindu': [], 'Christian': ['Catholic', 'Protestant']}} />
                          <SelectField name="spiritual" label="Spiritual Background" className="flex-1" options={['Prefer Not to Say', 'Religious', 'Atheist', 'Spiritual']} />
                          <SelectField name="marryOtherCaste" label="Will to marry in other caste?" options={['Yes', 'No']}/>
                      </Disclosure.Panel>
                </Disclosure>  

                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                      <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                        Habits & Hobbies
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <AutoComplete name="hobbies" label="Hobbies" options={["Reading", "Cooking", "Gardening", "Hiking", "Painting", "Photography", "Traveling", "Swimming", "Cycling", "Dancing", "Playing musical instruments", "Watching movies", "Playing video games", "Singing", "Fishing", "Yoga", "Knitting", "Running", "Bird watching", "Collecting stamps", "Chess", "Writing", "Soccer", "Basketball", "Tennis", "Golf", "Volunteering", "Meditation", "Sculpting", "Baking", "Skiing", "Surfing", "Puzzle solving", "Calligraphy", "Camping", "Archery", "Pottery", "Rock climbing", "Woodworking", "Skydiving", "Scuba diving", "Motorcycling", "Model building", "Astronomy", "Whale watching", "Kayaking", "Beekeeping", "Horseback riding", "Geocaching"]}/>
                          <SelectField name="diet" label="Eating Haits" options={['Prefer Not to Say', 'Vegetarian', 'Non Vegetarian', 'Eggetarian' ]} />
                          <SelectField name="smoking" label="Smoking" options={['Prefer Not to Say', 'Yes', 'No', 'Ocassionally' ]} />
                          <SelectField name="drinking" label="Drinking" options={['Prefer Not to Say', 'Yes', 'No', 'Drinks Socially' ]} />
                      </Disclosure.Panel>
                </Disclosure>  

                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                      <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                        Family Details
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-3">
                          <SelectField name="familyType" label="Family Type" options={['Prefer Not to Say', 'Nuclear', 'Joint']} />
                          <SelectField name="familyStatus" label="Family Status" options={['Prefer Not to Say', 'Rich', 'Upper Middle Class', 'Middle Class', 'Affluent']} />
                          <SelectField name="familyValues" label="Family Values" options={['Prefer Not to Say', 'Orthodox', 'Traditional', 'Moderate', 'Liberal']} />
                          <TextInput name="nativePlace" label="Native Place" className="flex-1"/>
                          <TextInput name="fatherName" label="Father's Name" className="flex-1"/>
                          <TextInput name="fatherProfession" label="Father's Profession" className="flex-1"/>
                          <TextInput name="motherName" label="Mother's Name" className="flex-1"/>
                          <TextInput name="motherProfession" label="Mother's Profession" className="flex-1"/>
                          <SelectField name="noOfBrothers" label="No. of Brothes" className="flex-1" options={[0, 1, 2, 3, 4, 'More than 4']} />
                          <SelectField name="noOfSisters" label="No. of Sisters" className="flex-1" options={[0, 1, 2, 3, 4, 'More than 4']} />
                      </Disclosure.Panel>
                </Disclosure>

                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden" defaultOpen={true}>
                      <Disclosure.Button className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full hover:bg-red-200 focus:outline-none">
                        About Me
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <ChevronUpIcon className="ui-open:rotate-180 ui-open:transform h-5 w-5 text-red-600"/>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-4 grid grid-cols-1">
                          <TextArea name="about" label="About Me" rows={5} />
                          <FileInput name="photoUrl" label="Profile Picture" defaultValue={user.photoUrl ? user.photoUrl : ( user.gender === 'Male' ? '/images/maleAvatar.png' : '/images/femaleAvatar.png')} previewSize={'w-60 h-60'}/>          
                      </Disclosure.Panel>
                </Disclosure>
                
                <button type="submit" className="mt-4 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"  disabled={isSubmitting}>
                  {isSubmitting &&
                      <Spinner className="w-4 h-4" />
                  }
                  Update
                </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default withAuth(ProfileUpdation)