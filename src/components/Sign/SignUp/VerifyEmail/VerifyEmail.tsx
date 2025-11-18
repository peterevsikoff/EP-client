import { emailVerified } from "action-creators";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(token)
            dispatch(emailVerified(token, navigate));
    }, [dispatch, navigate, token]);

    return(
        <div className="message">
        {
            token && <p>Проходим верификацию</p>
        }
        </div>
    )
}

export { VerifyEmail };