import React, { useRef, useState } from 'react'
import SurjapuriDialog from '../ui/dialog';
import { Form, Formik } from 'formik';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Spinner from '../ui/spinner';
import { sendPostFormBodyRequest } from '@/app/lib/utils';

function FileDialog({uid, className, label, disabled=false}) {
    const inputFile = useRef(null);
    const [fileUpload, setFileUpload] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) { 
          setFileUpload(true);
          setSelectedImage(file);
        }
      }
    
      const removeFile = () => {
        setSelectedImage(null); // Clear the selected file
        setFileUpload(false); 
      }


  return (
    <>
        <SurjapuriDialog isOpen={fileUpload} setIsOpen={setFileUpload}>
              <Formik
                initialValues={{file: selectedImage}}
                onSubmit={async (values, {setSubmitting}) => {
                  try { 
                    const { success, data } =  await sendPostFormBodyRequest(`/api/user/media/upload/${uid}`, values);
                      if(success) {
                        setSelectedImage(null);
                        setSubmitting(false);
                        setFileUpload(false);
                      }
                  } catch (error) { 
                    console.error(error);
                  }
                }}
              >
                {({isSubmitting, setSubmitting}) => (
                  <Form>
                      <XCircleIcon className='w-8 h-8 mb-2 float-right cursor-pointer text-red-600 hover:text-gray-900' onClick={removeFile}/>
                      <div className='mb-4'>
                        {selectedImage && 
                          <img src={URL.createObjectURL(selectedImage)} />
                        }
                      </div>
                      <input type="file" accept='image/*' className='hidden' name='file'/>
                      <button type="submit"  className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" disabled={ isSubmitting } onClick={()=> setSubmitting(true)}>
                          {isSubmitting &&
                              <Spinner className="w-4 h-4" />
                          }
                          Upload
                      </button>
                  </Form>
                )}
              </Formik>
            </SurjapuriDialog>
            <input type="file" id="upload_photo" className='hidden' ref={inputFile} accept="image/*" onChange={handleFileChange}/>
            <button className={`${className}`} onClick={() => inputFile.current.click()} disabled={disabled}>{label}</button>
    </>
  )
}

export default FileDialog