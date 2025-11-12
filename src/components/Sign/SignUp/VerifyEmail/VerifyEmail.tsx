import { useLocation } from "react-router-dom";

const VerifyEmail = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

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