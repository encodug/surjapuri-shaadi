import { Field, useFormikContext } from 'formik'
import CustomErrorMessage from './error-message'
import { useState } from 'react';

function OtherSelectField({name, label, options, className, placeholder, darkMode = false, ...props}) {
  const { setFieldValue } = useFormikContext();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState('');

    // Function to handle the custom input field change
    const handleCustomInputChange = (event) => {
        const newValue = event.target.value;
        setCustomValue(newValue);
        setFieldValue(name, newValue); // Set the select field's value
    };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFieldValue(name, selectedValue); 
    setShowCustomInput(selectedValue === 'Others');   
  }

  return (
    <div className={`${className} mb-2`}>
        <label htmlFor={name} className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</label>
        <Field as="select" id={name} name={name} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6 disabled:bg-slate-200" {...props} onChange={handleSelectChange}>
            <option value="" disabled>
              {placeholder || 'Select an option'}
            </option>
            {options.map((option) =>(
                <option key={option} value={option}>{option}</option>
            ))}
            <option value="Others">Others</option>
        </Field>
        {showCustomInput && (
            <div className='mt-1'>
                <label htmlFor={`${name}-custom`} className="text-sm font-medium">Please Specify</label>
                <input type="text" id={`${name}-custom`} name={`${name}-custom`} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" value={customValue} onChange={handleCustomInputChange}/>
            </div>
        )}
        <CustomErrorMessage name={name}/>
    </div>
  )
}

export default OtherSelectField