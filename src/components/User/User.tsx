import { useSelector } from "react-redux";
import { selectCommonData, selectUserData } from "selectors";
import "./user.scss";
import { PAGES } from "types";
import { NavLink } from "react-router-dom";

const User = () => {
    const { language } = useSelector(selectCommonData);
    const { user } = useSelector(selectUserData);

    // console.log(user);

    return(
        <div className="user">
            {
                !user ?
                <>
                    <NavLink to={`/${PAGES.SIGN_IN}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.sign_in}</NavLink>
                    <NavLink to={`/${PAGES.SIGN_UP}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.sign_up}</NavLink>
                </>
                :
                <>
                    <NavLink to={`/${PAGES.SIGN_UP}`} className={({ isActive }) => `${isActive ? "a-active" : "a-user"}`}>{`${language.hello}, ${user.email}`}</NavLink>
                    <NavLink to={`/${PAGES.SIGN_UP}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.log_out}</NavLink>
                </>
            }
        </div>
    )
}

export { User };