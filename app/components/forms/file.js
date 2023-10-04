import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useFormikContext } from 'formik'
import Image from 'next/image';
import React, { useState } from 'react'
import CustomErrorMessage from './error-message';

function FileInput({name, label, defaultValue, className, darkMode = false, previewSize}) {
    const { values, setFieldValue } = useFormikContext();
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = event => {
        const fileInput = event.target;

        if(!fileInput.files) {
            console.warn("No File was chosen");
            return;
        }

        if(!fileInput.files || fileInput.files.length === 0) {
            console.warn("Files list is empty");
            return;
        }

        const file = fileInput.files[0];
        const fileWithPreview = Object.assign(file, {preview: URL.createObjectURL(file)});
        setSelectedFile(fileWithPreview);
        setFieldValue(name, file);
    }

    const removeFile = () => {
        setSelectedFile(null);
        setFieldValue(name, '');
    }

  return (
    <div className={`${className} relative mb-2`}>
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</span>
        <div className="flex-1 border border-dashed border-gray-300 rounded-md p-4 flex items-center space-x-6">
            <div className={`${previewSize} relative my-4`}>
                <div className={`${previewSize} rounded-2xl relative overflow-hidden`}>
                    <Image src={values[name].preview === undefined ? (values[name] === null || values[name] === "" ? defaultValue : values[name] ): values[name].preview } alt="uploded File" fill className="object-fill object-center w-full h-full"/>
                </div>
                {selectedFile &&
                    <button type='button' className='w-6 h-6 hover:border-0 hover:bg-red-600 hover:text-slate-100 border border-red-600 bg-white text-red-600 rounded-full flex justify-center items-center absolute -top-3 -right-3 transition-colors' onClick={() => removeFile()}>
                        <XMarkIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
                    </button>
                }
            </div>
            <label>
                <span className="sr-only">Choose profile photo</span>
                <input name={name} type="file" onChange={onFileChange} className="file:mr-4 file:rounded-md file:bg-red-600 file:hover:bg-red-500 file:text-slate-100 file:p-2 file:border-0 file:font-['Poppins'] block w-full text-slate-500" accept="image/*"/>
            </label>
            <CustomErrorMessage name={name}/>
        </div>
    </div>
  )
}

export default FileInput