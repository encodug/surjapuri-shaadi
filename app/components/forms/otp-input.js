
import { useFormikContext } from 'formik';
import React from 'react'

function OTPInput(props) {
    const {
        size = 6,
        validationPattern = /[0-9]{1}/,
        field,
        className,
        ...restProps
    } = props;

    const formik = useFormikContext();
    const otpValue = formik.values[field.name] || new Array(size).fill('');

    const handleChange = (index, event) => {
        const elem = event.target;
        const newValue = event.target.value;

        if (!validationPattern.test(newValue) && newValue !== "") return;

        const newOtp = [...otpValue];
        newOtp[index] = newValue;
        const newOtpString = newOtp.join("").slice(0, size);   

        formik.setFieldValue(field.name, newOtpString);

        if (newValue) {
            const next = elem.nextElementSibling;
            next?.focus();
        }
    }

    const handleKeyUp = (event) => {
        const current = event.currentTarget;

        if(event.key === 'ArrowLeft' || event.key === 'Backspace') {
            const prev = current.previousElementSibling;
            prev?.focus();
            prev?.setSelectionRange(0, 1);
            return;
        }

        if (event.key === 'ArrowRight') {
            const next = current.nextElementSibling;
            next?.focus();
            next?.setSelectionRange(0, 1);
            return;
        }

    }

    const handlePaste = (event) => {
        event.preventDefault();
        const value = event.clipboardData.getData("text").substring(0, size);
        formik.setFieldValue(field.name, value);
    }

  return (
    <div className="flex gap-2 justify-center w-full">
        {Array.from({length: size}).map(( _ , index) => (
            <input key={index} {...restProps} 
                type="text"
                inputMode="numeric"
                autoComplete='one-time-code'
                className={`flex-1 rounded-md border-slate-200 shadow-sm text-lg focus:ring-inset focus:ring-2 focus:ring-red-300 focus:border-0 ${className || '' }`}
                style={{ width: `${100 / size}%` }}
                maxLength={1}
                value={otpValue[index] || ''} 
                onChange={(e) => handleChange(index, e)}
                onKeyUp={(e) => handleKeyUp(e)}
                onPaste={(e) => handlePaste(e)}
            />
        ))}
    </div>
  )
}

export default OTPInput