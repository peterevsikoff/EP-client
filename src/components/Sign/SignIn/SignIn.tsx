import { signIn } from "action-creators";
import { Input } from "components";
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCommonData } from "selectors";
import { INPUTTYPE, type IError, type IUserToServer, type MainTypeForChange } from "types";
import { validEmail } from "utils";

const SignIn = () => {
    const { language } = useSelector(selectCommonData);

    const [user, setUser] = useState<MainTypeForChange>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<IError | undefined>();
    
    const [, startTransition] = useTransition();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const callBackSuccess = () => startTransition(() => setLoading(false));
    const callBackError = (error: IError) => setError(error);
    const callBackServerError = () => {
        startTransition(() => setLoading(false));
        setError({message: language.server_error});
    }

    const handleSignIn = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => setLoading(true));
        dispatch(signIn(user as IUserToServer, callBackSuccess, callBackError, callBackServerError, navigate));
    }
    
    return(
        <section className="sign">
            {/* <HelmetHead title={language.sign_up} description="" noRobots/> */}
            <form onKeyDown={e => { if (e.key === "Enter") handleSignIn(e)}}>
                <h2>{language.enter}</h2>
                <div className="row-input">
                    <Input name={language.email} parameter="email" type={INPUTTYPE.EMAIL} value={user} setValue={setUser} requared autoFocus autoComplete="email"/>
                </div>
                <div className="row-input">
                    <Input name={language.password} parameter="password" type={INPUTTYPE.TEXT} value={user} setValue={setUser} requared
                    invalid={!!user?.passwordConfirm && !(user?.password === user?.passwordConfirm)} autoComplete="current-password"/>
                </div>
                <div className="sign-in-footer">
                    {
                        error &&
                        <div className="error-container">
                            {error.message}
                        </div>
                    }
                    <button type="submit" className="btn-primary" disabled={!(user && (!Object.keys(user).length || validEmail(user.email as string) && user.password )) || loading} onClick={e => handleSignIn(e)}>
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

export { SignIn };