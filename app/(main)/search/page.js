'use client'
import { useAuth } from "@/app/(auth)/useAuth";
import { SelectField, TextInput } from "@/app/components/forms";
import Profiles from "@/app/components/profile";
import LoadMore from "@/app/components/profile/loadMore";
import Spinner from "@/app/components/ui/spinner";
import { fetchGetParamRequest } from "@/app/lib/utils";
import { Form, Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react";

function QuickSearch() { 
    const searchParams  = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [quickSearchData, setQuickSearchData] = useState(null);
    const router = useRouter();
    const { user } = useAuth();

    const searchCriteria = {
      fromAge : searchParams.get('fromAge') || '',
      toAge : searchParams.get('toAge') || '',
      religion : searchParams.get('religion') || '',
      motherTongue : searchParams.get('motherTongue') || ''
    };

    const Search = useCallback( async () => {
      const searchObject = { page: 1, gender: (user.gender === 'Male') ? 'Female' : 'Male', ...searchCriteria }
      const {success, data, error } = await fetchGetParamRequest('/api/search/quick/', JSON.stringify(searchObject));
      if(success) {
        setQuickSearchData(data.profiles);
      } else if(error) {
        setQuickSearchData(null);
      }
    }, [user, searchCriteria]);

    useEffect(() => {
      const {  profile_completed } = user;
  
      if(profile_completed === 0) {
        router.push('/profile/edit');
      } else {
         Search();
      }
      setLoading(false);
    }, [user, searchParams]);
    



  return (
    <main>
      <section className="bg-red-600 text-slate-100">
        <div className="container mx-auto p-6 md:py-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Search Results</h2>
          <p>Search you match based on your interests and don't hesitate to approach them first. Interact with as many as possible.</p>
        </div>
      </section>
      <section className="border bg-slate-100 shadow-sm">
        <div className="container mx-auto p-2 px-6">
          <Formik
            initialValues={searchCriteria}
            onSubmit={(values, {setSubmitting}) => {
              router.push(`/search?${Object.entries(values).map(([key, value]) => `${key}=${value}`).join('&')}`);
              setSubmitting(false);
            }}
          >
              {({isSubmitting, setSubmitting}) => (
                <Form className="grid grid-cols-2 md:grid-cols-5 gap-x-4 place-items-center">
                  <TextInput label="From Age" name="fromAge" className="w-full"/>
                  <TextInput label="To Age" name="toAge" className="w-full"/>
                  <SelectField label="Religion" name="religion" options={['Islam', 'Hindu', 'Catholic']} className="w-full"/>
                  <SelectField label="Mother Tounge" name="motherTongue" options={['Surjapuri', 'Bengali', 'Hindi', 'English', 'Bihari']} className="w-full"/>
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
      </section>
      <section className="container mx-auto p-6 md:py-12">
        {loading ? 'Loading....' : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <Profiles profiles={quickSearchData}/>
            <LoadMore searchCriteria={{gender: (user.gender === 'Male') ? 'Female' : 'Male', ...searchCriteria}}/>
          </div>
        )}
      </section>
    </main>
  )
}

export default QuickSearch