import { useField, useFormikContext } from 'formik';
import CreatableSelect from 'react-select/creatable';
import CustomErrorMessage from './error-message';

function AutoComplete({name, label, className, darkMode = false, options, ...props}) {
    const [field] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = (newValue) => {
        setFieldValue(name, newValue); // Set the field value
      };


    const inputOptions = options.map(option => ({
        value: option,
        label: option,
    }));

  return (
    <div className={`${className} mb-2`}>
        <label htmlFor={name} className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</label>
        <CreatableSelect {...field} isMulti options={inputOptions} defaultValue className= {...props} onChange={handleChange} 
            theme={(theme) => ({
                ...theme,
                borderRadius: '0.375rem',
                colors: {
                ...theme.colors,
                primary25: '#CBD5E0',
                primary: '#E53E3E',
            },
            })}
        />
        <CustomErrorMessage name={name}/>
    </div>
  )
}

export default AutoComplete