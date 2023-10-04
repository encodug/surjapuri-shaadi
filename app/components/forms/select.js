import { Field, useFormikContext } from 'formik'
import CustomErrorMessage from './error-message'

function SelectField({name, label, options, className, placeholder = 'Select an option',  darkMode = false, ...props}) {

  return (
    <div className={`${className} mb-2`}>
        <label htmlFor={name} className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</label>
        <Field as="select" id={name} name={name} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 disabled:bg-slate-200" {...props} >
            <option value="" disabled>
              { placeholder }
            </option>
            {options.map((option) =>(
                <option key={option} value={option}>{option}</option>
            ))}
        </Field>
        <CustomErrorMessage name={name}/>
    </div>
  )
}

export default SelectField