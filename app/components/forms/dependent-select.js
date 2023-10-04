import { useFormikContext } from "formik"
import { useEffect, useState } from "react";
import SelectField from "./select";


function DependentSelectField(props) {
    const [arrayIndex, setArrayIndex] = useState('');
    const { values } = useFormikContext();

    useEffect(() => {
      setArrayIndex(values[props.dependency]);
    }, [values])
    
  return (
    <SelectField name={props.name} label={props.label} options={arrayIndex ? props.data[arrayIndex] : []}></SelectField>
  )
}

export default DependentSelectField