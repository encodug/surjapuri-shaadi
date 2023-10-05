'use client'
import { useAuth } from "@/app/(auth)/useAuth";
import withAuth from "@/app/(auth)/withAuth";
import { SelectField, TextInput } from "@/app/components/forms";
import Spinner from "@/app/components/ui/spinner";
import { auth } from "@/app/lib/firebase";
import { Tab } from "@headlessui/react"
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Form, Formik } from "formik"
import { ToastContainer, toast } from "react-toastify";
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { sendPostRequest } from "@/app/lib/utils";
import { useEffect } from "react";

function Settings() {
  const { user } = useAuth();

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-red-900/20 p-1">
          <Tab className={({selected}) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700 ring-red-400 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white' }`} >Photo Privacy</Tab>
          <Tab className={({selected}) => `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700 ring-red-400 ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white' }`} >Account</Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">

        <Tab.Panel className={`p-4 rounded-lg bg-slate-100`}>
          <h3 className="text-xl font-bold">Photo Privacy Setting</h3>
          <p className="text-sm mb-2">You can set your photo privacy from here, manage who can see your photos. </p>
          <hr/>
          <div className="my-4">

            <Formik
              initialValues={{photoPrivacy: user?.photoPrivacy || ''}}
              onSubmit={async (values, {setSubmitting}) => {
                const { success } = await sendPostRequest(`/api/user/update/${user.uid}`, {uid: user.uid, update: values});
                if(success) {
                  setSubmitting(false);
                  toast('Photo Privacy Updated.');
                }
                
              }}
            >
              {({values, isSubmitting, setSubmitting}) => (
                <Form>
                  <SelectField name="photoPrivacy" options={['Everyone', 'Accepted Connections', 'Accepted & Invited']} label="Current Status"/>
                  <button type="submit"  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-4" disabled={ isSubmitting }>
                    {isSubmitting &&
                        <Spinner className="w-4 h-4" />
                    }
                    Set Privacy
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Tab.Panel>

        <Tab.Panel className={`p-4 rounded-lg bg-slate-100`}>
          <div>
            <h3 className="text-xl font-bold">Change Password</h3>
            <p className="text-sm mb-2">Have any privacy concern ? You can easily change your account password from here. </p>
            <hr/>
            <div className="my-4">
            <Formik
              initialValues={{currentPassword: '', newPassword: '', confrimNewPassword: ''}}
              validationSchema={Yup.object().shape({
                currentPassword: Yup.string().required("You can't change your password without knowing your current one."),
                newPassword: Yup.string().required("A password is essential to keep your account secure.").min(8, 'Your password should be at least 8 characters long.').notOneOf([Yup.ref('currentPassword'), null], "Your new password can't be the same as your current one.").matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                  'Your password should be like a mystery novel - with uppercase, lowercase, numbers, and special characters!'
                ),
                confrimNewPassword: Yup.string().required("Please confirm your new password.").oneOf([Yup.ref('newPassword'), null], 'Passwords do not match'),
              })}
              onSubmit={async (values, {setSubmitting}) => {
                const currentUser = auth.currentUser;
                try{
                  const credential = EmailAuthProvider.credential(currentUser.email, values.currentPassword);
                  reauthenticateWithCredential(currentUser,credential).then(() => {
                    updatePassword(currentUser, values.newPassword).then(() => {
                      setSubmitting(false);
                      toast("Password Changed Successfully");
                    });
                  }).catch((error) => {
                    console.error(error);
                  })
                } catch (error) {
                  console.error(error);
                }

              }}
            >
              {({isSubmitting, setSubmitting}) => (
                <Form>
                    <TextInput type="password" label="Current Password" name="currentPassword"/>
                    <TextInput type="password" label="New Password" name="newPassword" />
                    <TextInput type="password" label="Confirm New Password" name="confrimNewPassword" />
                    <button type="submit"  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mt-4" disabled={ isSubmitting }>
                    {isSubmitting &&
                        <Spinner className="w-4 h-4" />
                    }
                    Change Password
                  </button>
                </Form>
              )}
            </Formik>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 mt-5">Delete Profile</h3>
            <hr/>
          </div>
         
        </Tab.Panel>

      </Tab.Panels>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </Tab.Group>
  )
}

export default withAuth(Settings);