import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { ErrorMessage } from 'formik'
import React from 'react'

function CustomErrorMessage({ name }) {
  return (
    <ErrorMessage name={name}>
        {msg => 
            <div className='text-red-600 text-sm items-center flex mt-2'>
                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                {msg}
            </div>
        }
    </ErrorMessage>
  )
}

export default CustomErrorMessage