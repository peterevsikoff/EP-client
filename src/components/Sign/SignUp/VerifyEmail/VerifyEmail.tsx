import { emailVerified } from "action-creators";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import type { IError } from "types";

const VerifyEmail = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const callBackSuccess = () => {};
    const callBackError = (error: IError) => console.log(error);
    const callBackServerError = () => {
        
    }

    useEffect(() => {
        if(token)
            dispatch(emailVerified(token, callBackSuccess, callBackError, callBackServerError, navigate));
    }, [dispatch, navigate, token]);

    return(
        <div>
        {token ? (
            <p>Токен: {token}</p>
        ) : (
            <p>Токен не найден</p>
        )}
        </div>
    )
}

export { VerifyEmail };