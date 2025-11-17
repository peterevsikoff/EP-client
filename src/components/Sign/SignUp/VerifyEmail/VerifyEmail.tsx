import { emailVerified } from "action-creators";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { IError } from "types";

const VerifyEmail = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [m, setM] = useState("");
    const callBackSuccess = (m: string) => {setM(m)};
    const callBackError = (error: IError) => console.log(error);
    const callBackServerError = () => {
        
    }

    useEffect(() => {
        if(token)
            dispatch(emailVerified(token, callBackSuccess, callBackError, callBackServerError, navigate));
    }, [dispatch, navigate, token]);

    return(
        <div className="message">
        {
            token && <p>Проходим верификацию</p>
        }
        {
            m && <p>{m}</p>
        }
        </div>
    )
}

export { VerifyEmail };