import { Hide, View } from "components";
import { useState, useTransition, type Dispatch, type SetStateAction } from "react";
import { INPUTTYPE, type MainTypeForChange } from "types";
import "./input.scss";
import { validEmail } from "utils";

const Input = ({name, value, setValue, oldValue, requared = false, invalid, type, parameter, min, disabled, autoFocus, autoComplete}: {
    name: string,
    oldValue?: string | number,
    requared?: boolean,
    invalid?: boolean,
    parameter: string,
    type: INPUTTYPE,
    min?: number,
    value?: MainTypeForChange,
    setValue: Dispatch<SetStateAction<MainTypeForChange | undefined>>,
    disabled?: boolean,
    autoFocus?: boolean,
    autoComplete?: string
}) => {

    const [, startTransition] = useTransition();
    const [viewPassword, setViewPassword] = useState(true);

    const valid = (entry: string | number | undefined) => {
        if(invalid) return " is-invalid";
        if(entry){
            if(type === INPUTTYPE.EMAIL) return (validEmail(entry as string) ? (entry !== oldValue ? " is-valid" : "") : " is-invalid");
            if(entry !== oldValue) return " is-valid";
        } else {
            if(requared) return " is-invalid";
        }
        return "";
    }

    return(
        <div className="form-floating">
            <input type={type === INPUTTYPE.PASSWORD ? viewPassword ? INPUTTYPE.PASSWORD : INPUTTYPE.TEXT : type} name={parameter} autoComplete={autoComplete} disabled={disabled} autoFocus={autoFocus} className={`form-control${valid(value?.[parameter])}`} 
                placeholder={name as string} value={(value?.[parameter] as string) ?? ""} min={min} onChange={(e) => setValue({...value, [parameter]: (e.target.value.trim() ? e.target.value : "")})} />
            <label>{name}</label>
            {
                type === INPUTTYPE.PASSWORD &&
                <button className="btn-password" onClick={(e) => {e.preventDefault(); startTransition(() => setViewPassword(!viewPassword))}}>
                    {
                        viewPassword ? <Hide/> : <View/>
                    }
                </button>
            }
        </div>
    )
}

export { Input };