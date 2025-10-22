import { Burger, Slogan, User } from "components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCommonData, selectUserData } from "selectors";
import { PAGES, ROLES } from "types";
import "./header.scss";

const Header = () => {
    const { language } = useSelector(selectCommonData);
    const { user } = useSelector(selectUserData);
    
    const [show, setShow] = useState(false);

    const navConfig = [
        { id: "", roles: [undefined, ROLES.USER, ROLES.PRO, ROLES.ADMIN], key: "home" },
        { id: PAGES.TESTS, roles: [undefined, ROLES.USER, ROLES.PRO, ROLES.ADMIN], key: "tests" },
        { id: PAGES.ABOUT, roles: [undefined, ROLES.USER, ROLES.PRO, ROLES.ADMIN], key: "about" },
        { id: PAGES.USERS, roles: [ROLES.ADMIN], key: "users" },
    ];

    return(
        <header className={`header${show ? " header-active" : ""}`}>
            <div className="container">
                <div className="section-tile">
                    <div className="header-wrap">
                        <div className="logo">
                            <Slogan/>
                        </div>
                        <div className={`header-right-side${show ? " nav-active" : ""}`} onClick={() => {if(show) setShow(false)}}>
                            {/* <nav className="navigation">
                                <NavLink to="/" className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.home}</NavLink>
                                <NavLink to={`/${PAGES.TESTS}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.tests}</NavLink>
                                <NavLink to={`/${PAGES.ABOUT}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.about}</NavLink>
                                <NavLink to={`/${PAGES.USERS}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.users}</NavLink>
                            </nav> */}
                            <nav className="navigation">
                                {
                                    navConfig.map(({id, ...x}) => (x.roles.includes(user?.role) && 
                                        <NavLink key={id} id={id} to={`/${id}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language[x.key]}</NavLink>))
                                }
                            </nav>
                            <User/>
                        </div>
                        <button className={`btn-burger${show ? " btn-burger-active" : ""}`} onClick={() => setShow(!show)}>
                            <Burger/>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export { Header };