'use client'
import { useEffect, useState } from "react";
import withAuth from "./(auth)/withAuth";
import { useRouter } from "next/navigation";
import { useAuth } from "./(auth)/useAuth";
import Image from "next/image";
import { Form, Formik } from "formik";
import TextInput from "./components/forms/text-input";
import { fetchGetParamRequest } from "./lib/utils";
import Profiles from "./components/profile";
import LoadMore from "./components/profile/loadMore";
import Spinner from "./components/ui/spinner";
import { SelectField } from "./components/forms";

function Home() {
  const [loading, setLoading] = useState(true);
  const [quickSearchData, setQuickSearchData] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  const defaultSearch = async () => {
    const searchObject = { page: 1, gender: (user.gender === 'Male') ? 'Female' : 'Male' }
    const {success, data } = await fetchGetParamRequest('/api/search/quick/', JSON.stringify(searchObject));
    if(success) {
      setQuickSearchData(data.profiles);
    }
  }

  useEffect(() => {
    const {  profile_completed } = user;

    if(profile_completed === 0) {
      router.push('/profile/edit');
    } else {
       defaultSearch();
    }
    setLoading(false);
  }, [user]);
  
  return (
    <section>
      {!loading &&
        <main>
          <div className="w-full h-96 -z-10 relative">
              <Image src="/images/search-banner.png" fill quality={100} className="object-cover lg:object-fill object-center" alt="Happy Couple, Finds your today"/>
          </div>
          <div className="px-6 md:px-8 container mx-auto -mt-12 z-10">
            <div className="bg-gradient-to-b md:bg-gradient-to-r from-red-500 to-gray-800 rounded-lg w-full p-6">
                <Formik 
                  initialValues={{fromAge: '', toAge: '', religion: '', motherTongue: ''}}
                  onSubmit={(values) => {
                    router.push(`/search?${Object.entries(values).map(([key, value]) => `${key}=${value}`).join('&')}`);
                  }}
                >
                  {({isSubmitting, setSubmitting}) => (
                    <Form className="grid grid-cols-2 md:grid-cols-5 gap-x-4 place-items-center">
                      <TextInput label="From Age" name="fromAge" darkMode className="w-full"/>
                      <TextInput label="To Age" name="toAge" darkMode className="w-full"/>
                      <SelectField label="Religion" name="religion" options={['Islam', 'Hindu', 'Catholic']} darkMode className="w-full"/>
                      <SelectField label="Mother Tounge" name="motherTongue" options={['Surjapuri', 'Bengali', 'Hindi', 'English', 'Bihari']} darkMode className="w-full"/>
                      <button type="submit" className="bg-red-600 hover:bg-red-500 p-2 rounded-lg text-white font-semibold col-span-2 md:col-span-1 w-full mt-4 flex justify-center items-center">
                        {isSubmitting && 
                          <Spinner className="w-4 h-4"/>
                        }
                        Let's Begin
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
          </div>
          <div className="container mx-auto p-6 md:py-8">
              <div className="text-center mb-10 mt-4">
                <p>Our Members</p>
                <h3 className="font-bold text-4xl my-2">Start Looking For Your Partner</h3>
                <p>The beginning of a beautiful relationship is here. Why not start looking for your ideal partner online right away?</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  <Profiles profiles={quickSearchData}/>
                  <LoadMore searchCriteria={{gender: (user.gender === 'Male') ? 'Female' : 'Male'}}/>
              </div>
          </div>
        </main>
      }
    </section>
  )
}

export default withAuth(Home);
