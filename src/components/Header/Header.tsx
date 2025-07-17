import { Burger, User } from "components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectCommonData } from "selectors";
import { PAGES } from "types";
import "./header.scss";

const Header = () => {
    const { language } = useSelector(selectCommonData);
    
    const [show, setShow] = useState(false);

    return(
        <header className={`header${show ? " header-active" : ""}`}>
            <div className="container">
                <div className="section-tile">
                    <div className="header-wrap">
                        Logo
                        <div className={`header-right-side${show ? " nav-active" : ""}`} onClick={() => {if(show) setShow(false)}}>
                            <nav className="navigation">
                                <NavLink to="/" className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.home}</NavLink>
                                <NavLink to={`/${PAGES.TESTS}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.tests}</NavLink>
                                <NavLink to={`/${PAGES.ABOUT}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.about}</NavLink>
                                <NavLink to={`/${PAGES.ADMIN}`} className={({ isActive }) => `${isActive ? "a-active" : ""}`}>{language.admin}</NavLink>
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