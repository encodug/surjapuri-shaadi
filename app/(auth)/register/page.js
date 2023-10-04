'use client'
import { Field, Form, Formik } from 'formik'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { OTPInput, CustomErrorMessage, TextInput } from '@/app/components/forms';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { sendPostRequest } from '@/app/lib/utils';
import { Player } from '@lottiefiles/react-lottie-player';
import Link from 'next/link';
import { useAuth } from '../useAuth';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/ui/spinner';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("We'd love to know your name! It's important for a personalized experience."),
  email: Yup.string().email("Oops! Your email doesn't look quite right").required("Your email will help us keep you connected."),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, "Oops! Enter a Valid mobile number").required("We'll use this to connect you with your potential match."),
  gender: Yup.string().required("Let us know your gender."),
  DOB: Yup.date().required("Your Date of Birth helps us find matches around your age."),
  password: Yup.string().required("A password is essential to keep your account secure.").min(8, 'Your password should be at least 8 characters long.').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    'Your password should be like a mystery novel - with uppercase, lowercase, numbers, and special characters!'
  ),
  otp: Yup.string().matches(/^d{4}$/),
});

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [enableResendOTP, setEnableResendOTP] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '',  email: '', mobile: '', gender: '', DOB: '', password: '', otp: ''});

  const initialTime = 5 * 60 * 1000;
  const [remainingTime, setRemainingTime] = useState(initialTime);

  const timer = () => {
    setInterval(() => {
      setRemainingTime((prevTime)=> {
        if(prevTime <= 1000) {
          clearInterval(timer);
          onOTPExpired();
          return 0;
        } else {
          return prevTime - 1000;
        }
      });
    }, 1000);
  }

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = ((remainingTime % 60000) / 1000).toFixed(0);

  const onOTPExpired = async () => {
      const { success } = await sendPostRequest('/api/expireOTP', { mobile: initialValues.mobile });
      if (success) {
        setEnableResendOTP(true);
      } else {
        /// Increment Attempt , if attempt is greater than 5, disable user ip.
        console.error('Failed to expire OTP');
      }
  };
  

  const resendOTP = async () => {
      const { success, data } = await sendPostRequest('/api/resendOTP', { mobile: initialValues.mobile });
      if (success) {
        if (data?.insert?.affectedRows > 0) {
          setEnableResendOTP(false);
          setRemainingTime(5 * 60 * 1000);
          timer();
        }
      }
  };
  

  const checkUserExists = async (endpoint, value) => {
    try {

      const response = await fetch(endpoint + value);
      if (response.status === 200) {
        const data = await response.json();
        return data?.user?.length > 0;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    return false;
  }

  useEffect(() => {
    // Check if the user is already authenticated
    if (user) {
      // If the user is authenticated, redirect to the homepage
      router.push('/');
    }
  }, [user, router]);

  return (
    <main>
    <section className='w-screen min-h-screen relative inline-flex'>
        <div className="absolute inset-0 bg-gray-300">
          <Image src="/images/landingHero.png" alt="Walking Together" quality={100} fill className='object-cover object-center' />
        </div>
        <div className="container md:px-5 md:py-24 mx-auto flex">
          <div className="lg:w-1/2 xl:w-2/5 md:w-2/3 bg-white/75 md:rounded-lg p-8 flex flex-col md:ml-auto w-full relative z-10 shawdow-md">
          {!isOTPRequested ? (
            <>  
              <h1 className='font-bold lg:text-4xl text-3xl'>Find Your Perfect Match</h1>
              <p className='mt-2 text-sm lg:text-base'>Looking for that someone special? Create an account with us and get ready to fill in the pages of your great love story.</p>
              <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                validateOnBlur
                enableReinitialize
                onSubmit={async (values, {setFieldError}) => {
                  const { email, mobile } = values;
                  let userExists = false;
                    
                    if(await checkUserExists('api/user/mobile/', mobile)){
                      setFieldError('mobile', 'Mobile Number already registered with us.');
                      userExists = true;
                    }
                  
                    if(await checkUserExists('api/user/email/', email)){
                      setFieldError('email', 'Email Address already registered with us.');
                      userExists = true;
                    }

                    if(!userExists){
                        const { success, data } = await sendPostRequest('/api/generateOTP', values);
                        if (success) {
                          if (data?.insert?.affectedRows > 0) {
                            setIsOTPRequested(true);
                            setInitialValues(values);
                            timer();
                          }
                        }
                    } 
                }}
              >
                {({values, setSubmitting, isSubmitting, setFieldError}) => (
                  <Form className='mt-10 flex flex-col gap-3'>
                      <>
                        <TextInput name="name" type="text" label="Name"/>
                        <TextInput name="email" type="email" label="Email Address"/>
                        <TextInput name="mobile" type="tel" label="Mobile No." />
                        <TextInput name="password" type="password" label="Create Password"/>

                        <div className="inline-flex flex-col lg:flex-row content-center lg:items-center gap-3">
                          <div>
                            <div id="gender-radio-group" className="text-sm font-medium">Gender</div>
                            <div role="group" aria-labelledby="gender-radio-group" className='flex items-center gap-4 mt-1 py-2.5'>
                              <label>
                                <Field type="radio" name="gender" value="Male" className='h-4 w-4 border-slate-400 text-red-500 focus:ring-red-300 mr-2'/>
                                Male
                              </label>
                              <label>
                                <Field type="radio" name="gender" value="Female" className='h-4 w-4 border-slate-400 text-red-500 focus:ring-red-300 mr-2'/>
                                Female
                              </label>
                            </div>
                            <CustomErrorMessage name="gender" />
                        </div>
                        <TextInput type="date" name="DOB" label="Date of Birth" max={values.gender === 'Male' ? new Date(new Date().setFullYear(new Date().getFullYear() - 21 )).toLocaleDateString('en-CA') : new Date(new Date().setFullYear(new Date().getFullYear() - 18 )).toLocaleDateString('en-CA')} />
                      </div>

                      <button type="submit" className='bg-red-600 rounded-md text-slate-100 font-semibold p-2 mt-2 transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-red-500' disabled={ isSubmitting } onClick={()=> setSubmitting(true)}>
                        {isSubmitting &&
                            <Spinner className="w-4 h-4" />
                        }
                        Register Free
                      </button>
                      <small className='text-gray-900 text-sm'>By clicking on 'Register Free', you confirm that you accept the <a className='text-red-500'>Terms of Use</a> and <a className='text-red-500'>Privacy Policy</a></small>
                      </>
                  </Form>
                )}
              </Formik>
            </>
           ) : (
            <>
            {!userRegistered ? (
              <>
              <h1 className='font-bold lg:text-4xl text-3xl'>Mobile Phone Verification</h1>
                <Formik
                  initialValues={initialValues}
                  onSubmit={async (values, {setFieldError}) => {
                    const { success: otpSuccess , data: otpData } = await sendPostRequest('/api/validateOTP', values);
                    if(otpSuccess) {
                      if(otpData?.verified?.affectedRows > 0){
                        //Register User 
                        try {
                          const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
                          if(user && (user !== null || user !== undefined)) {
                              const { success: registerSuccess } = await sendPostRequest('/api/user/register', {...values, uid: user.uid});
                              if( registerSuccess ) {
                                await sendEmailVerification(user);
                                await signOut(auth);
                                setUserRegistered(true);
                              }
                          }
                        } catch(error) {
                          console.error(error); 
                        }
                      } else {
                        setFieldError('otp', 'Invalid OTP');
                      }
                    }
                  }}
                >
                  {({values, isSubmitting, setSubmitting}) => (
                    <Form>
                      <label htmlFor="otp" className='text-sm font-medium'>Enter the OTP you received at +91 xxxxxx{values.mobile.slice(6, 4)}</label>
                      <Field component={OTPInput} name="otp" size={6} />
                      <CustomErrorMessage name='otp'/>
                      <div className='mt-3 flex justify-between items-center'>
                        <p>Expires in : {minutes}:{seconds < 10 ? "0" : ""}{seconds} minutes</p>
                        <button type="button" className='font-bold p-1 text-red-500 disabled:text-red-300 cursor-pointer hover:border-b-2 hover:border-red-500 hover:disabled:border-b-0' disabled={!enableResendOTP} onClick={() => resendOTP() }>RESEND OTP</button>
                      </div>
                      <button type="submit"  disabled={ isSubmitting } onClick={()=> setSubmitting(true)} className='bg-red-600 rounded-md text-slate-100 font-semibold p-2 mt-2'>
                        {isSubmitting &&
                            <Spinner className="w-4 h-4" />
                        }
                        Verify OTP
                      </button>
                    </Form>
                  )} 
                </Formik>
              </>
            ) : (
              <div className='align-middle text-center'>
                <Player src="/lottie/success.json" background="transparent" speed={1} style={{ height: '300px', width: '300px' }} loop autoplay></Player>
                <h2 className="text-2xl font-bold p-4">User Registered Successfully!</h2>
                <Link href="/signIn">
                  <button type="button" className='bg-red-600 rounded p-2 text-slate-100 text-md font-semibold'>Go to Login</button>
                </Link>
              </div>
            )}
            </>
          )}
          </div>
        </div>
    </section>
    <section className='py-12 px-5'>
      <div className="container md:px-5 md:py-8 mx-auto flex flex-col-reverse md:flex-row md:items-stretch">
        <div className="md:w-2/3 mt-5 flex flex-col gap-8 md:pr-8">
          {/** ---- Choose Partner --- */}
          <div className="flex rounded-md p-4 hover:border hover:border-red-100 hover:shadow-sm">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-600 text-slate-100 mb-4 flex-shrink-0">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" className="w-8 h-8">
                <path d="M23.813 4.91a3.473 3.473 0 0 0-2.264.729c-1.333-1.022-3.23-.974-4.447.244H17.1v.002a3.378 3.378 0 0 0 .011 4.783l2.053 2.035 2.05 2.035a.5.5 0 0 0 .706-.002l2.043-2.043 2.043-2.043c1.312-1.312 1.358-3.428.033-4.744l-.027-.029a.5.5 0 0 0-.016-.016 3.27 3.27 0 0 0-2.183-.95zm-.217.96a2.394 2.394 0 0 1 1.695.7l.021.026a.5.5 0 0 0 .018.015c.947.939.917 2.38-.033 3.33l-2.043 2.043-1.692 1.692-1.697-1.684-2.05-2.035a2.358 2.358 0 0 1-.008-3.37l.002.003a2.387 2.387 0 0 1 3.388-.008.5.5 0 0 0 .707-.002c.471-.471 1.08-.71 1.692-.71zm-4.563 1.25c-.43 0-.71.33-.83.66-.12.328-.12.676 0 1.005a.5.5 0 1 0 .94-.344.585.585 0 0 1 0-.318c.007-.02 0-.011.002-.016a.5.5 0 0 0-.11-.988h-.002zM1.5 14a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-.984l10.08 3.345a.5.5 0 0 0 .033.01c1.073.272 2.308.113 3.252-.504l9.711-5.277a.5.5 0 0 0 .006-.006l.236-.135a.5.5 0 0 0 0-.002 1.833 1.833 0 0 0 .795-2.3c-.306-.726-.91-1.059-1.38-1.127-.472-.07-.858.064-.858.064a.5.5 0 0 0-.053.02l-5.326 2.472c.007-.066.022-.13.022-.197 0-1.124-.931-2.037-2.059-2.037h-4.44c-.018-.034-.04-.082-.058-.113a5.014 5.014 0 0 0-.887-1.163 5.188 5.188 0 0 0-3.64-1.474L7 15.094V14.5a.5.5 0 0 0-.5-.5h-5zm.5 1h.994v6.492a.5.5 0 1 0 1.002.002L3.994 15H6v9H2v-9zm10.432 1.09a4.181 4.181 0 0 1 3.447 1.789c.074.108.143.22.207.334.078.142.132.228.174.326l.129.303h5.07c.599 0 1.059.456 1.059 1.035 0 .422-.25.777-.616.94l-.047.02a1.096 1.096 0 0 1-.398.077l-6.953.002v.998h6.953c.202 0 .393-.038.578-.092a.5.5 0 0 0 .19-.056l.013-.006.055-.026 6.908-3.203a.879.879 0 0 1 .385-.023c.215.031.419.09.603.527a.818.818 0 0 1-.363 1.043l-.234.133-9.71 5.275a.5.5 0 0 0-.036.024c-.659.442-1.682.59-2.483.388l-10.302-3.42A.5.5 0 0 0 7 22.464v-6.371l5.432-.002z"/>
              </svg>
            </div>
            <div className="flex-grow pl-6">
              <h2 className="text-gray-900 text-lg font-semibold mb-2">Choose Partner</h2>
                <p className="leading-relaxed text-base">Set up your account, provide detailed information, and find a partner that  matches your interest</p>
            </div>
          </div>
          {/** ---- Send Message --- */}
          <div className="flex rounded-md p-4 hover:border hover:border-red-100 hover:shadow-sm">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-600 text-slate-100 mb-4 flex-shrink-0">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" className="w-8 h-8">
                <path d="M16.94 5.012a4.643 4.643 0 0 0-4.037 1.84 4.675 4.675 0 0 0-.932 2.55 4.597 4.597 0 0 0-1.53 1.6l-.164.287-.287-.166a4.652 4.652 0 0 0-3.537-.47.5.5 0 0 0-.016.001l-.044.014a4.442 4.442 0 0 0-1.577.781 4.716 4.716 0 0 0-1.189 1.377 4.665 4.665 0 0 0 1.705 6.367l.719.416 1.537.887-.297 4.975a.5.5 0 0 0 .857.377l3.12-3.225 1.986 1.15a.5.5 0 0 0 .684-.183l2.664-4.623.55.955a.5.5 0 0 0 .684.183l1.988-1.15 3.117 3.225a.5.5 0 0 0 .858-.377l-.297-4.975 1.537-.89.719-.417a4.663 4.663 0 0 0-1.12-8.54 4.651 4.651 0 0 0-3.534.47l-.002.002-.286.164-.166-.287a4.652 4.652 0 0 0-3.71-2.318zm-.065.99a3.637 3.637 0 0 1 2.908 1.828l.416.719a.5.5 0 0 0 .684.183l.72-.414a3.634 3.634 0 0 1 2.776-.37c.903.241 1.71.826 2.219 1.708a3.646 3.646 0 0 1-1.34 5.002l-.719.416-1.805 1.043a.5.5 0 0 0-.25.463l.237 3.932-2.45-2.533a.5.5 0 0 0-.61-.084l-1.891 1.091-3.905-6.773-.416-.719a3.645 3.645 0 0 1 1.34-5.002 3.655 3.655 0 0 1 2.086-.49zm7.27 2.94a.5.5 0 0 0-.127.984c.509.136.907.542 1.043 1.08a1.63 1.63 0 0 1-.407 1.52.5.5 0 1 0 .717.695 2.62 2.62 0 0 0 .66-2.461 2.48 2.48 0 0 0-1.754-1.8.5.5 0 0 0-.132-.019zm-8.65.081a.5.5 0 0 0-.354.16.5.5 0 0 0 .244.825l6.761 1.812a.5.5 0 1 0 .258-.966l-6.761-1.811a.5.5 0 0 0-.149-.02zm-3.438 1.563c.097.482.266.957.525 1.406l.416.719.326.566-4.64 1.244a.5.5 0 0 0-.252.153.5.5 0 0 0 .51.812l4.898-1.312.517.898-2.257.606a.5.5 0 0 0-.252.152h-.002a.5.5 0 0 0 .511.813l2.518-.674 1.148 1.996-2.703 4.69-1.892-1.093a.5.5 0 0 0-.61.086l-2.45 2.534.237-3.934a.5.5 0 0 0-.248-.463l-1.804-1.043-.721-.416a3.643 3.643 0 0 1-1.34-5c.515-.893 1.255-1.451 2.158-1.693a.5.5 0 0 0 .016 0l.047-.014a3.633 3.633 0 0 1 2.775.37l.721.413a.5.5 0 0 0 .682-.181l.416-.721a.5.5 0 0 0 .002-.002 3.61 3.61 0 0 1 .748-.912zm3.886.627a.5.5 0 0 0-.355.16.5.5 0 0 0 .244.824l2.898.778a.5.5 0 1 0 .26-.967l-2.898-.778a.5.5 0 0 0-.149-.017zm4.823 1.293a.5.5 0 0 0-.356.16.5.5 0 0 0 .244.824l1.926.518a.5.5 0 1 0 .26-.967l-1.926-.518a.5.5 0 0 0-.148-.017zm-13.82.103a.5.5 0 0 0-.135.02 2.483 2.483 0 0 0-1.754 1.8c-.222.877.03 1.811.66 2.46a.5.5 0 1 0 .717-.698 1.619 1.619 0 0 1-.407-1.515 1.474 1.474 0 0 1 1.043-1.08.5.5 0 0 0-.125-.987zm10.398 1.051a.5.5 0 0 0-.354.16.5.5 0 0 0 .244.825l2.897.775a.5.5 0 1 0 .26-.965l-2.899-.777a.5.5 0 0 0-.148-.018zm-7.051 2.514a.5.5 0 0 0-.12.017l-1.925.516a.5.5 0 0 0-.217.117.5.5 0 0 0 .477.85l1.926-.516a.5.5 0 0 0-.141-.984zm3.463 1.148a.5.5 0 0 0-.16.024l-2.897.775a.5.5 0 0 0-.252.154h-.002a.5.5 0 0 0 .512.81l2.898-.774a.5.5 0 0 0-.1-.989z"/>
              </svg>
            </div>
            <div className="flex-grow pl-6">
              <h2 className="text-gray-900 text-lg font-semibold mb-2">Send Message</h2>
                <p className="leading-relaxed text-base">Once you get a match, don’t be shy, It’s your time to shine. Get in touch for a fun conversation.</p>
            </div>
          </div>
          {/** ---- Send Message --- */}
          <div className="flex rounded-md p-4 hover:border hover:border-red-100 hover:shadow-sm">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-red-600 text-slate-100 mb-4 flex-shrink-0">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" className="w-8 h-8">
                <path d="M9.992 2.98a.5.5 0 0 0-.492.506v1a.5.5 0 1 0 1 0v-1a.5.5 0 0 0-.508-.506zM6.812 4.3a.5.5 0 0 0-.347.858l.707.707a.5.5 0 1 0 .707-.707l-.707-.707a.5.5 0 0 0-.36-.15zm6.36 0a.5.5 0 0 0-.344.151l-.707.707a.5.5 0 1 0 .707.707l.707-.707a.5.5 0 0 0-.363-.857zm11.33.468a.5.5 0 0 0-.05.002.5.5 0 0 0-.442.634l.258.967a.5.5 0 1 0 .966-.26l-.26-.965a.5.5 0 0 0-.472-.378zm3.412.45a.5.5 0 0 0-.44.257l-.5.867a.5.5 0 1 0 .866.5l.5-.867a.5.5 0 0 0-.426-.756zM8 6.995a.5.5 0 0 0-.447.276l-1 2a.5.5 0 0 0 .047.525l1.125 1.5c-4.28 1.119-7.15 5.212-6.674 9.656a9.006 9.006 0 0 0 9.021 8.043 8.958 8.958 0 0 0 4.73-1.39l.016.01a.5.5 0 0 0 .047.032c4.2 2.638 9.757 1.372 12.4-2.824 2.293-3.637 1.65-8.295-1.294-11.199l1.726-.738a.5.5 0 0 0 .303-.428l.135-2.232a.5.5 0 0 0-.25-.463l-3.463-2a.5.5 0 0 0-.238-.067.5.5 0 0 0-.288.082L22.03 9.01a.5.5 0 0 0-.22.476l.224 1.87a8.999 8.999 0 0 0-1.383-.278 9.031 9.031 0 0 0-5.796 1.34 8.955 8.955 0 0 0-2.579-1.123l1.125-1.5a.5.5 0 0 0 .047-.525l-1-2A.5.5 0 0 0 12 6.994H8zm22.008.961a.5.5 0 0 0-.133.02l-.967.257a.5.5 0 1 0 .26.967l.965-.258a.5.5 0 0 0-.125-.986zm-21.7.04h3.383l.5 1H7.81l.5-1zm15.881.788 2.928 1.692-.066 1.115-3.795-2.192.933-.615zM8 9.994h4.002L10 12.66 8 9.994zm14.92.365 3.467 2.002-3.067 1.309-.4-3.31zm-3.326 1.664a7.957 7.957 0 0 1 2.57.415l.133 1.103a6.95 6.95 0 0 0-2.711-.523v.002a7.035 7.035 0 0 0-3.084.763 9.013 9.013 0 0 0-.773-.719 8.03 8.03 0 0 1 3.865-1.04zm-11.221.14a.5.5 0 0 0 .002 0l.678.901C5.64 13.53 3 16.456 3 19.994c0 3.86 3.14 7 7 7s7-3.14 7-7c0-3.538-2.64-6.465-6.053-6.93l.676-.898a7.99 7.99 0 0 1 6.344 8.55 7.993 7.993 0 0 1-7.903 7.278 7.995 7.995 0 0 1-8.02-7.15 7.993 7.993 0 0 1 6.329-8.682zm1.613 1.831a.5.5 0 0 0 .014 0c.899 0 1.747.202 2.512.555-.16.21-.315.425-.46.652-2.067 3.258-1.777 7.343.427 10.254A5.992 5.992 0 0 1 4 19.995a5.992 5.992 0 0 1 5.986-6zm9.606.024a5.978 5.978 0 0 1 3.033.789.5.5 0 0 0 .016.01 5.992 5.992 0 0 1 2.24 8.148 5.986 5.986 0 0 1-7.738 2.496 8.98 8.98 0 0 0 .031-10.896 6.02 6.02 0 0 1 2.418-.547zm5.379.033a7.996 7.996 0 0 1 1.449 10.238c-2.297 3.644-7.03 4.79-10.734 2.67.273-.224.531-.463.777-.717 3.325 1.707 7.44.494 9.289-2.787 1.724-3.059.885-6.87-1.814-8.96l1.033-.444zm-11.565 1.002c.273.188.527.4.764.629a7.018 7.018 0 0 0-.58.841c-1.465 2.54-1.144 5.616.56 7.8a6.002 6.002 0 0 1-.785.642c-2.036-2.591-2.338-6.283-.469-9.229.155-.244.334-.462.51-.683zm1.43 1.396a5.972 5.972 0 0 1-.012 7.104c-1.357-1.858-1.594-4.405-.369-6.53.116-.201.246-.391.38-.574z" />
              </svg>
            </div>
            <div className="flex-grow pl-6">
              <h2 className="text-gray-900 text-lg font-semibold mb-2">Go on a Date</h2>
                <p className="leading-relaxed text-base">After that, why not go on a date and build your relationship? If everything goes well, live happily ever after.</p>
            </div>
          </div>
          {/** ---- End  --- */}
        </div>
        <div className="md:w-1/3 md:pl-6 md:border-l-2 md:border-red-500 md:ps-8 flex items-center">
          <h1 className='text-3xl lg:text-6xl font-bold'>How Will Love Find Your Way?</h1>
        </div>
      </div>
    </section>
    <section className='relative h-[650px] md:h-[500px]'>
        <div className="relative h-full">
          <Image src="/images/app-bg.jpg" alt="Bride Groom Holding Hands" quality={100} fill sizes='100vw' className='object-cover object-center' /> 
        </div>
        <div className="absolute inset-0 bg-red-600/50 mix-blend-multiply"/>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center container mx-auto md:px-5 md:py-8 text-slate-100">
              <h1 className="text-5xl font-bold mb-2">Download Surjapuri Shaadi App on<br/> Your Smartphone</h1>
              <p className="text-base mt-4">Our app is available for free on the App Store and Google Play.<br/>Download the app now to never miss a knock!</p>
              <div className='flex flex-col md:flex-row items-center justify-center my-5 gap-5'>
                <Image src="/images/available_on_google.png" alt="Available on the Google Play" height={64} width={216} className='cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg'/>
                <Image src="/images/available_on_app.png" alt="Available on the App Store" height={64} width={216} className='cursor-pointer transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg' />
              </div>
            </div>
        </div>
    </section>
    </main>
  )
}