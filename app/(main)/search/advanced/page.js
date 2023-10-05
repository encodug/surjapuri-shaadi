'use client'
import { useAuth } from '@/app/(auth)/useAuth';
import { DependentSelectField, SelectField, TextInput } from '@/app/components/forms';
import Profiles from '@/app/components/profile';
import LoadMore from '@/app/components/profile/loadMore';
import Spinner from '@/app/components/ui/spinner';
import { degrees, indianDistricts, indianStates } from '@/app/lib/dataUtils';
import { fetchGetParamRequest } from '@/app/lib/utils';
import { Disclosure } from '@headlessui/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Form, Formik, yupToFormErrors } from 'formik';
import { useState } from 'react'
import * as Yup from 'yup';

function AdvancedSearch() {
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [criteria, setCriteria] = useState(null);
    const { user } = useAuth();
    const [initialValues, setInitialValues] = useState({
        fromAge: '', 
        toAge: '', 
        fromHeight: '', 
        toHeight: '', 
        maritalStatus: '', 
        physicalStatus: '', 
        religion: '', 
        caste: '',
        motherTongue: '',
        location: '',
        district: '',
        state: '',
        education: '', 
        employmentSector: '', 
        annualIncome: '' 
    });

    return (
        <main>
            <section className="bg-red-600 text-slate-100">
            <div className="container mx-auto p-6 md:py-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Advanced Search</h2>
                <p>Advance search contain criteria that helps you to find a suitable profile and don't hesitate to approach them first. Interact with as many as possible.</p>
            </div>
            </section>
            <section className='container mx-auto p-6 md:py-8 flex flex-col lg:flex-row space-y-3 lg:space-x-3 lg:space-y-0 overflow-hidden'>
                <Disclosure as="div" className="border shadow rounded-lg overflow-hidden flex-1 lg:flex-none lg:basis-8/12" defaultOpen={true}>
                    <div className="text-left border-b-2 p-3 font-semibold relative flex justify-between items-center w-full">
                        Advanced Search
                        <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                        <Disclosure.Button>
                            <AdjustmentsHorizontalIcon className="h-6 w-6 text-red-600 hover:bg-red-500 hover:text-white p-0.5 rounded"/>
                        </Disclosure.Button>
                    </div>
                    <Disclosure.Panel className="w-full">
                        {({ close }) => (
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize
                                validationSchema={Yup.object().shape({
                                    fromAge: Yup.number().required(),
                                    toAge: Yup.number().required(),
                                })}
                                onSubmit={async (values,{ setSubmitting }) => {
                                    const searchObject = { page: 1, gender: (user.gender === 'Male') ? 'Female' : 'Male', ...values};
                                    setCriteria({gender: (user.gender === 'Male') ? 'Female' : 'Male', ...values});
                                    const {success, data, error } = await fetchGetParamRequest('/api/search/advanced/', JSON.stringify(searchObject));
                                    if(success) {
                                        close();
                                        setSearchData(data.profiles);
                                    } else if(error) {
                                        setSearchData(null);
                                    }
                                    setInitialValues(values);
                                    setLoading(false);
                                    setSubmitting(false);
                                }}
                            >
                                {({values, isSubmitting, setSubmitting}) => (
                                    <Form className='bg-slate-100 p-5'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-x-4'>
                                        <div className="flex flex-row items-start space-x-4">
                                            <TextInput label="Age" name="fromAge" />
                                            <p className='mt-8'>to</p>
                                            <TextInput name="toAge" className="mt-6"/>
                                        </div>
                                        <div className="flex flex-row items-start space-x-4">
                                            <TextInput label="Height" name="fromHeight" />
                                            <p className='mt-8'>to</p>
                                            <TextInput name="toHeight" className="mt-6"/>
                                        </div>
                                        <SelectField label="Marital Status" name="maritalStatus" options={['Never Married', 'Divorced', 'Widow', 'Widower' ]} />
                                        <SelectField label="Physical Status" name="physicalStatus" options={['Normal', 'Physically Challenged' ]} />
                                        <SelectField label="Religion" name="religion" options={['Islam', 'Hindu', 'Christian']} />
                                        <DependentSelectField name="caste" label="Caste" dependency="religion" data={{'Prefer Not to Say': [], 'Islam': ['Barelvi', 'Deobandi', 'Ahl-e-Hadees'], 'Hindu': [], 'Christian': ['Catholic', 'Protestant']}} />
                                        <SelectField name="motherTongue" label="Mother Tongue" options={['Surjapuri', 'Urdu', 'Hindi', 'Bengali', 'Bihari', 'English']}/>

                                        <div className="text-left border-b-2 pt-3 font-semibold relative flex justify-between items-center w-full md:col-span-2 xl:col-span-4">
                                            Location Details 
                                            <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                                        </div>
                                        <TextInput name="location" type="text" label="City / Town / Village"/>
                                        <DependentSelectField name="district" label="District" dependency="state" data={indianDistricts}/>
                                        <SelectField name="state" label="State" options={indianStates}/>                    


                                        <div className="text-left border-b-2 pt-3 font-semibold relative flex justify-between items-center w-full md:col-span-2 xl:col-span-4">
                                            Education / Occupation / Income Details 
                                            <span className="after:bg-red-600 after:w-32 after:h-0.5 after:absolute after:-bottom-0.5 after:left-0"/>
                                        </div>  
                                        <SelectField name="education" label="Education" options={degrees} />
                                        <SelectField name="employmentSector" label="Employeed In" options={['Private', 'Government', 'Business', 'Defence', 'Self Employed', 'Not Working']}/>
                                        <SelectField name="annualIncome" label="Annual Income" options={['1,00,000 - 2,00,000', '2,00,000 - 5,00,000', '5,00,000 - 10,00,000', '10,00,000 - 15,00,000', '15,00,000 - 20,00,000', 'Above 20,00,000' ]}/>
                                    </div>

                                    <button type="submit" className="flex bg-red-600 rounded-md text-slate-100 font-semibold p-2 mt-2 md:col-span-2 lg:col-span-4">
                                        {isSubmitting &&
                                            <Spinner className="w-4 h-4" />
                                        }
                                        Search Now
                                    </button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </Disclosure.Panel>
                </Disclosure>
                <div className='flex-1 lg:flex-none lg:basis-4/12 border flex justify-center items-center rounded-lg'>
                    <p className='font-bold text-4xl'>Advertise Here</p>
                </div>
        </section>
        {criteria &&
            <section className='container mx-auto p-6 md:py-8'>
                {loading ? (
                    <div>Skeleton</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    <Profiles profiles={searchData}/>
                    <LoadMore searchCriteria={criteria}/>
                </div>
                )}
            </section>
        }
        </main>
    )
}

export default AdvancedSearch