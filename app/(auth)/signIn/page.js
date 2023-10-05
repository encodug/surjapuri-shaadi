'use client'
import { TextInput, CustomErrorMessage } from "@/app/components/forms";
import Spinner from "@/app/components/ui/spinner";
import { auth } from "@/app/lib/firebase";
import { fetchGetParamRequest } from "@/app/lib/utils";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Formik, Form, Field } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from 'yup';

function SignInPage() {

    const [sendEmailVerification, setSendEmailVerification] = useState(false);
    const router = useRouter();

    const initialValues = { email: '', password: ''}
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Oops! That doesn’t look like a valid email address. Mind checking it again?').required('Your email is missing! We need it to find your love.'),
        password: Yup.string().required("Hey, don't forget to enter your password! It's our secret code.").min(8, 'Your password should be at least 8 characters long.').matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          'Your password should be like a mystery novel - with uppercase, lowercase, numbers, and special characters!'
        ),
    });

  return (
        <main className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={async (values, {setSubmitting, setFieldError}) => {
                        const {email, password} = values;
                        try{
                            const { user } = await signInWithEmailAndPassword(auth, email, password);
                            if(user && !user.emailVerified) { 
                                await signOut(auth);
                                setFieldError('email', 'Please verify your email before signing in. Love is in the air, and so is your email verification!')
                                setSendEmailVerification(true);
                            } else {
                                const {success, data} = await fetchGetParamRequest('/api/user/uid/', user.uid);
                                if(success) {
                                    const { user }  = data;
                                    if(user.profile_completed === 0 ){
                                        router.push('/profile/edit');
                                    } else {
                                        router.push('/');
                                    }
                                }
                            }
                        } catch (error) {
                            const code = error.code;
                            switch (code) {
                                case "auth/invalid-email",
                                     "auth/user-not-found":
                                    setFieldError('email', 'Oops! We couldn\'t find that email. Maybe you mistyped it?');
                                    break;
                                case "auth/wrong-password": 
                                    setFieldError('password', 'Uh-oh! Looks like you forgot your password. Try again!');
                                    break;
                                default: 
                                    console.error(error);
                            }
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, setSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>Email Address</label>
                                    {sendEmailVerification &&
                                        <button type="button" className="font-semibold text-sm text-red-600 hover:text-red-500">Send Verification Mail</button>
                                    }   
                                </div>
                                <div className="mt-2">
                                    <Field type="email" autoComplete="off" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
                                    <CustomErrorMessage name="email" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    <Link href="">
                                        <span className="font-semibold text-sm text-red-600 hover:text-red-500">Forgot password?</span>
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <Field name="password" autoComplete="off" type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"/>
                                    <CustomErrorMessage name="password" />
                                </div>
                            </div>

                            <button type="submit"  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" disabled={ isSubmitting }>
                                {isSubmitting &&
                                    <Spinner className="w-4 h-4" />
                                }
                                Sign in
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                <Link href="/register">
                    <span className="font-semibold leading-6 text-red-600 hover:text-red-500"> Register Free</span>
                </Link>
                </p>
            </div>
        </main>

  )
}

export default SignInPage