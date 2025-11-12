import { signUp } from "action-creators";
import { Input, PasswordCheck } from "components";
import { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCommonData } from "selectors";
import { INPUTTYPE, type IError, type IUserToServer, type MainTypeForChange } from "types";
import { validEmail } from "utils";
import "../sign.scss";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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

    const handleSignUp = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => setLoading(true));
        dispatch(signUp(user as IUserToServer, callBackSuccess, callBackError, callBackServerError, navigate));
    }

    const handleGeneratePassword = (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLFormElement>) => {
        e.preventDefault();
        const length = 16;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        const randomValues = new Uint32Array(length);
        crypto.getRandomValues(randomValues);
        
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[randomValues[i] % chars.length];
        }
        setUser(prev => ({...prev, password: result}));
    }

    return(
        <section className="sign">
            {/* <HelmetHead title={language.sign_up} description="" noRobots/> */}
            <form onKeyDown={e => { if (e.key === "Enter") handleSignUp(e)}}>
                <h2>{language.sign_up}</h2>
                <div className="row-input">
                    <Input name={language.email} parameter="email" type={INPUTTYPE.EMAIL} value={user} setValue={setUser} requared autoFocus autoComplete="email"/>
                </div>
                <div className="row-input">
                    <Input name={language.password} parameter="password" type={INPUTTYPE.TEXT} value={user} setValue={setUser} requared
                    invalid={!!user?.passwordConfirm && !(user?.password === user?.passwordConfirm)} autoComplete="current-password"/>
                    <button className="btn-generate-password" onClick={e => handleGeneratePassword(e)}>
                        {language.generate_password}
                    </button>
                </div>
                {
                    user?.password &&
                    <PasswordCheck password={user.password as string}/>
                }
                <div className="row-input">
                    <Input name={language.password_confirm} parameter="passwordConfirm" type={INPUTTYPE.TEXT} value={user} setValue={setUser} requared
                    invalid={!!user?.password && !(user?.password === user?.passwordConfirm)} disabled={!user?.password}/>
                </div>
                <div className="sign-in-footer">
                    {
                        error &&
                        <div className="error-container">
                            {error.message}
                        </div>
                    }
                    <button type="submit" className="btn-primary" disabled={!(user && (!Object.keys(user).length || validEmail(user.email as string) && user.password && user.passwordConfirm && (user.password === user.passwordConfirm))) || loading} onClick={e => handleSignUp(e)}>
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