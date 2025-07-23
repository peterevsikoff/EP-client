import { signUp } from "action-creators";
import { Input } from "components";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCommonData } from "selectors";
import { INPUTTYPE, type IError, type IUserToServer, type MainTypeForChange } from "types";
import { validEmail } from "utils";
import "../sign.scss";
import { useDebouncedFunction } from "hooks";
import zxcvbn from 'zxcvbn';

const SignUp = () => {
    const { language } = useSelector(selectCommonData);

    const [user, setUser] = useState<MainTypeForChange>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<IError | undefined>();
    const [score, setScore] = useState(0);
    const [, startTransition] = useTransition();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const callBackSuccess = () => startTransition(() => setLoading(false));
    const callBackError = (error: IError) => setError(error);
    const callBackServerError = () => {
        startTransition(() => setLoading(false));
        setError({errorText: language.server_error});
    }

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLFormElement>) => {
        startTransition(() => setLoading(true));
        e.preventDefault();
        dispatch(signUp(user as IUserToServer, callBackSuccess, callBackError, callBackServerError));
    }

    const checkPassword = useCallback((password: string) => {
        const result = zxcvbn(password);
        setScore(result.score);
    }, []);

    const { debouncedFn, cancel } = useDebouncedFunction(checkPassword, 1000);

    useEffect(() => {
        return () => cancel();
    }, [cancel]);

    useEffect(() => {
        // if(user?.password){
            debouncedFn((user?.password ?? "") as string);
        // }
    }, [debouncedFn, user?.password]);
    
    return(
        <section className="sign">
            {/* <HelmetHead title={language.sign_up} description="" noRobots/> */}
            <form onKeyDown={e => { if (e.key === "Enter") handleSignUp(e)}}>
                <h2>{language.sign_up}</h2>
                <div className="row-input">
                    <Input name={language.email} parameter="email" type={INPUTTYPE.EMAIL} value={user} setValue={setUser} requared autoFocus/>
                </div>
                <div className="row-input">
                    <Input name={language.password} parameter="password" type={INPUTTYPE.TEXT} value={user} setValue={setUser} requared
                    invalid={!!user?.passwordConfirm && !(user?.password === user?.passwordConfirm)}/>
                </div>
                {
                    user?.password &&
                    <div className="password-score">
                        {`Сложность пароля: ${score}`}
                    </div>
                }
                <div className="row-input">
                    <Input name={language.password_confirm} parameter="passwordConfirm" type={INPUTTYPE.TEXT} value={user} setValue={setUser} requared
                    invalid={!!user?.password && !(user?.password === user?.passwordConfirm)} disabled={!user?.password}/>
                </div>
                <div className="sign-in-footer">
                    {
                        error &&
                        <div className="error-container">
                            {error.errorText}
                            {
                                error.exist &&
                                <a onClick={() => navigate("/signIn")}>{language.sign_in}</a>
                            }
                        </div>
                    }
                    <button className="btn-primary" disabled={!(user && (!Object.keys(user).length || validEmail(user.email as string) && user.password && user.passwordConfirm && (user.password === user.passwordConfirm))) || loading} onClick={e => handleSignUp(e)}>
                        {language.sign_in}
                        {
                            loading &&
                            <span className="spinner-border"></span>
                        }
                    </button>
                </div>
            </form>
        </section>
    )
}

export { SignUp };