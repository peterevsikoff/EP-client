import { useDebouncedFunction } from "hooks";
import { useCallback, useEffect, useState } from "react";
import zxcvbn from "zxcvbn";
import "./password-check.scss";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectCommonData } from "selectors";

const PasswordCheck = ({password}: {
        password?: string
    }) => {

    const { language } = useSelector(selectCommonData);

    const [score, setScore] = useState(0);

    const checkPassword = useCallback((password: string) => {
        const result = zxcvbn(password);
        setScore(result.score);
    }, []);

    const { debouncedFn, cancel } = useDebouncedFunction(checkPassword, 1000);

    useEffect(() => {
        return () => cancel();
    }, [cancel]);

    useEffect(() => {
        debouncedFn((password ?? "") as string);
    }, [debouncedFn, password]);

    const getClassScale = (value: number) => {
        switch(value){
            case 0: return("very-weak")
            case 1: return("weak")
            case 2: return("average")
            case 3: return("good")
            case 4: return("great")
            default: return("")
        }
    }
    
    return(
        <div className="password-check">
            <div className="password-score">
                <div className={clsx("scale", getClassScale(score))} style={{width: `${(score + 1) * 20}%`}}></div> 
            </div>
            <div className="password-check-title">
                {[language.very_weak, language.weak, language.average, language.good, language.great][score] || ""}
            </div>
        </div>
    )
}

export { PasswordCheck };