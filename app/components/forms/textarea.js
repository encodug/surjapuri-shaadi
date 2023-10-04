import { Field, useField, useFormikContext } from 'formik'
import CustomErrorMessage from './error-message'

function TextArea({name, label, type, row, className, darkMode = false, ...props}) {
    const { values } = useFormikContext();
  return (
    <div className={`${className} mb-2`}>
        <label htmlFor={name} className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{ label }</label>
        <Field as="textarea" autoComplete="off" row={row} name={name} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 disabled:bg-slate-200" {...props}/>
        <CustomErrorMessage name={name} />
    </div>
  )
}

export default TextArea